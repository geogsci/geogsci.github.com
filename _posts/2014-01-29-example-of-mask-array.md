---
title: "NumPy masked arrays: an example"
layout: "post"
---



In an earlier post [I have talked about](http://blog.remotesensing.io/2013/05/Dealing-with-no-data-using-NumPy-masked-array-operations/) the usefulness of NumPy's masked array operations (link). Now heres a simple useage example, which I've put together after getting a bit unstuck while using them with GDAL datasets.

##Input data
Level 3 Global mapped SMOS Ocean Salinity dataset [accessed from the Centre Aval de Traitement des Donnees SMOS (CATDS)](http://www.catds.fr).

##The task
To convert this into a scaled GeoTIFF. The data values in the raw NETCDF need to be linearly scaled, but we need to ignore values of -32767 indicating pixels with no data, or areas of land and sea ice in this case. 

Data centres will store.....  which brings me onto...

##... The problem
When I first put this together, I assumed when converting the data into a NumPy array using GDAL [in my usual way](http://blog.remotesensing.io/2013/03/using-gdal-with-python-basic-intro), the masked array functions would work. However, my resultant GeoTIFF no data pixels were being recorded as zeros rather than being labelled no data, rendering my whole method a failure. 

The issue occurs when the input data is stored as integer values in a data format such as NetCDF or HDF. Data centres do this to cut down on data volumne, so it requires the user to linearly scale the integers given slope and offset values. This gives the real physical values. 

I did finally work out where this was going wrong in my script, and here's the function I wrote. The comments describe my point.

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

      # THIS is the key to making masked arrays work with
      # NumPY arrays you have read from GDAL datasets,
      # the data type needs to be explicitly defined
      osarr  = np.array(osarr, dtype=np.float32)
  
      # then you can create the masked array
      m = np.ma.masked_values(osarr, nodata)

      # and very quickly apply the linear scaling, ignoring the no data pixels
      scaled = m * slope + inter


      # and finally save out the GeoTIF
      outdata = gdal.GetDriverByName("GTiff")
      dst_ds = outdata.Create(outfile, rows, cols, 1, gdal.GDT_Float64)
      band = dst_ds.GetRasterBand(1)
      band.SetNoDataValue(nodata)
      dst_ds.SetGeoTransform(outgeo)
      dst_ds.SetProjection(outproj.ExportToWkt())
      band.WriteArray(scaled)


  
##To illustrate this further

**First we convert the GDAL dataset to a NumPy array. `os` is the GDAL dataset.

    >>> osarr = os.ReadAsArray()
    >>> osarr
    array([[-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           ..., 
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767],
           [-32767, -32767, -32767, ..., -32767, -32767, -32767]], dtype=int16)
    	   
Then we create the masked array.	   
    
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
    
And perform the linear scaling.
    	   
    >>> scaled = m * slope + inter
    
Now we look at the output data, and see that all the no data values have turned into zeros, even though they should have been ignored in the calculation...
    
    >>> scaled.data
    array([[ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           ..., 
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.],
           [ 0.,  0.,  0., ...,  0.,  0.,  0.]])
    
    	   
... even though areas of real data do scale (picking a pixel in the sea).
    
    >>> scaled.data[100,100]
    34.664999999999999
    
So instead we add this line to define the array as datatype float.
    
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
    
And now the scaled output no data values remain as they should
    
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
	   
So when we write this to file and we get a dataset with all areas of land remaining with the no data value of -32767. 

![SMOS salinity dataset](/assets/posts/smos2.png) 



