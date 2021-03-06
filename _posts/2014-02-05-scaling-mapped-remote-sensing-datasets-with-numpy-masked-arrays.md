---
title: "Scaling Mapped Remote Sensing Datasets with NumPy Masked Arrays"
layout: "post"
---

In an earlier post [I have talked about](http://blog.remotesensing.io/2013/05/Dealing-with-no-data-using-NumPy-masked-array-operations/) the usefulness of NumPy's masked arrays. Now here's a simple implementation, which I put together after getting a bit unstuck while using them myself.

##Input data
**Level 3 Global mapped SMOS Ocean Salinity** dataset [accessed from the Centre Aval de Traitement des Donnees SMOS (CATDS)](http://www.catds.fr).

![SMOS salinity dataset](/assets/posts/smos-salinity-composite.png) 
_10 day composite SMOS ocean surface salinity (11/11/2011 - 20/11/2011)_

##The task
**To convert this data from NETCDF with integer values into a scaled GeoTIFF with real salinity values for easy use and visualisation in a desktop GIS.** Data centres will store grids of integer values to cut down on data storage volume. So a simple linear scaling can be applied to convert them into their true float values. 

However, the areas of land and sea ice are classed as no data with a specific value of -32767 which needs to be ignored in the calculation with the use of a masked array. Sounds simple, but this is where I encountered...

##... The problem
**The masked values turn into zeros after performing the linear scaling.** So my resultant GeoTIFF had values of zero rather than -32767 in areas of land and sea ice.

##The solution
**Convert the input integer array to a float array before creating the masked array.** Here's the function I wrote. Firstly I converted my data into a NumPy array [in my usual way](http://blog.remotesensing.io/2013/03/using-gdal-with-python-basic-intro), taking acount of projection and transform information. The key is then to change the input array to data type float before creating a masked array.


    {% highlight python %}
    import numpy as np
    import osgeo.gdal as gdal
    import osgeo.osr as osr

    def smos_os_convert(infile,outfile):
      """
      Converts SMOS ocean salinity L3 mapped products to scaled tifs
      linear scaling equation: salinity = data * 0.001 + 30
      """
  
      gdal.AllRegister()

      nodata = -32767 
      slope  = 0.001
      inter  = 30
  
      proj    = "+proj=cea +lon_0=0 +lat_ts=30 +x_0=0 +y_0=0 \
                 +a=6371228 +b=6371228 +units=m +no_defs"
      outproj = osr.SpatialReference()
      outproj.ImportFromProj4(proj)
      outgeo  = [-17334193.9437, 50171.32835, 0, 7338939.4596, 0.0, -50171.32835]

      os      = gdal.Open(infile)
      osarr   = os.ReadAsArray()
      [cols, rows] = osarr.shape

      # Here is where I define the arrays data type as float.
      osarr  = np.array(osarr, dtype=np.float32)
  
      # Then you can create the masked array...
      m = np.ma.masked_values(osarr, nodata)

      # ... and very quickly apply the linear scaling, ignoring the no data pixels.
      scaled = m * slope + inter


      # And finally save out the GeoTIF
      outdata = gdal.GetDriverByName("GTiff")
      dst_ds = outdata.Create(outfile, rows, cols, 1, gdal.GDT_Float64)
      band = dst_ds.GetRasterBand(1)
      band.SetNoDataValue(nodata)
      dst_ds.SetGeoTransform(outgeo)
      dst_ds.SetProjection(outproj.ExportToWkt())
      band.WriteArray(scaled)
      {% endhighlight %}


  
##To illustrate this further

First we convert the GDAL dataset to a NumPy array. `os` is the GDAL dataset.
    
    {% highlight python %}
    >>> osarr = os.ReadAsArray()
    >>> osarr
    array([[-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           ..., 
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767]], dtype=int16)
    	   
    {% endhighlight %}

Then we create the masked array.	   
    

    {% highlight python %}
    >>> m = np.ma.masked_values(osarr, nodata)
    >>> m
    masked_array(data =
     [[-- -- -- ..., -- -- --]
     [-- -- -- ..., -- -- --]
     [-- -- -- ..., -- -- --]
     ..., 
     [-- -- -- ..., -- -- --]
     [-- -- -- ..., -- -- --]
     [-- -- -- ..., -- -- --]],
                 mask =
     [[ True  True  True ...,  True  True  True]
     [ True  True  True ...,  True  True  True]
     [ True  True  True ...,  True  True  True]
     ..., 
     [ True  True  True ...,  True  True  True]
     [ True  True  True ...,  True  True  True]
     [ True  True  True ...,  True  True  True]],
           fill_value = -32767)
    >>> m.data
    array([[-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           ..., 
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767]], dtype=int16)
    {% endhighlight %}

And perform the linear scaling.
    
    {% highlight python %}
    >>> scaled = m * slope + inter
    {% endhighlight %}

Now we look at the output data, and see that all the no data values have turned into zeros, even though they should have been ignored in the calculation...
    
    {% highlight python %}
    >>> scaled.data
    array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           ..., 
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.]])
    {% endhighlight %}
    	   
... even though areas of real data do scale (picking a pixel in the sea).
    
    {% highlight python %}
    >>> scaled.data[100,100]
    34.664999999999999
    {% endhighlight %}

So instead we add this line to define the array as datatype float.
    
    {% highlight python %}
    >>> osarr = np.array(osarr, dtype=np.float32)
    >>> m = np.ma.masked_values(osarr,nodata)
    >>> m.data
    array([[-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           ..., 
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.]], dtype=float32)
    >>> scaled = m * slope + inter
    {% endhighlight %}

And now the scaled output no data values remain as they should
    
    {% highlight python %}
    >>> scaled.data
    array([[-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           ..., 
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.],
           [-32767., -32767., -32767., ..., -32767., -32767., -32767.]], dtype=float32)
    >>> scaled.mask
    array([[ True,  True,  True, ...,  True,  True,  True],
           [ True,  True,  True, ...,  True,  True,  True],
           [ True,  True,  True, ...,  True,  True,  True],
           ..., 
           [ True,  True,  True, ...,  True,  True,  True],
           [ True,  True,  True, ...,  True,  True,  True],
           [ True,  True,  True, ...,  True,  True,  True]], dtype=bool)
    {% endhighlight %}	   

So when we write this to file and we get a dataset with all areas of land remaining with the no data value of -32767. 




