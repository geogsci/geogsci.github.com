---
layout: post
title: "Using GDAL with Python: a basic introduction"
---
Using GDAL with Python opens up a lot of flexibility in raster processing. By converting your raster data into a [NumPy](http://www.numpy.org/) array, you can make use of all Python's array operations.

So in this very simple example, I will convert a single band georeferenced raster, to a 2D NumPy array, and back again. Once the raster has been read in as an array, any raster operations are possible. 

    from osgeo import gdal
    import numpy as np

    # Read the input raster into a Numpy array
    indata = "inputfile.tif"
    g      = gdal.Open(indata)
    a      = g.ReadAsArray()

    # Do some processing....

    # Save out to a GeoTiff

    # First of all, gather some information from the original file
    [cols,rows] = a.shape
    datatype    = a.dtype
    trans       = g.GetGeoTransform()
    projs       = g.GetProjection()
    nodatav     = g.GetNoDataValue()
    outname     = "outputfile.tif"

    # Create the file, using the information form the original file
    outdata = gdal.GetDriverByName("GTiff")
    outdata.Create(str(outname),rows,cols,1,datatype)

    # Write the array to the file
    outdata.GetRasterBand(1).WriteArray(a)

    # Set a no data value if required
    outdata.GetRasterBand(1).SetNoDataValue(0)

    # Georeference the image
    outdata.SetGeoTransform(trans)

    # Write projection information
    outdata.SetProjection(projs)
