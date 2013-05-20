---
layout: post
title: "Using ArcPy for Raster Analysis"
---

In order to do bulk raster analysis, or anything slightely bespoke, I will generally opt for using [GDAL with Python](http://blog.remotesensing.io/2013/03/using-gdal-with-python-basic-intro/). However, its possible to achieve similar things within an ESRI ArcGIS world if you want to, using [ArcPy](http://help.arcgis.com/en/arcgisdesktop/10.0/help/index.html#//000v000000v7000000).

If all you need to do is a simple point operation (in this case, multiplying each pixel by 2), then this can very quickly be achieved using [ArcPy's raster calculator](http://help.arcgis.com/en/arcgisdesktop/10.0/help/index.html#//009z000000z7000000.htm). The Spatial Analysis extension is required for this.

    import arcpy
    import numpy as np
    from arcpy.sa import *

    arcpy.CheckOutExtension("Spatial")

    infile = "inputfile.tif"

    # do any calculation on the raster object
    x = Raster(infile) * 2

    # save the new raster
    x.save("outfile.tif")

If this is implemented using the Python prompt in Arcmap, as soon as `x` has been created it will appear as a layer in the "Table of Contents" labelled `x`. At this point it's only saved in memory. If you quit Arcmap, the raster will be lost.

To do anything more complex with rasters such as filtering and neighbourhood functions, this method won't cut it. In this case it's necessary to start using [NumPy arrays](http://docs.scipy.org/doc/numpy/reference/arrays.html). Just as I have previously written about using [NumPy arrays for raster processing with GDAL](http://blog.remotesensing.io/2013/03/using-gdal-with-python-basic-intro/), below is a similar example using ArcPy. 

Just for the purpose of this post, I'm only going to multiply the raster by 2 again. But obviously once data is in an array, anything in possible.

    import arcpy
    import numpy as np

    infile  = "inputfile.tif"
    in_arr  = arcpy.RasterToNumPyArray(infile, nodata_to_value=9999)

    # NB: I find it useful to use the optional argument `nodata_to_value`. 
    # That way, ArcPy will read the no data value from the dataset, and 
    # set it to this defined value in the NumPy array. You then know exactly 
    # what number represent no data in the array.

    # do some processing
    out_arr = in_arr * 2

    # gather some information on the original file
    spatialref = arcpy.Describe(infile).spatialReference
    cellsize1  = arcpy.Describe(infile).meanCellHeight
    cellsize2  = arcpy.Describe(infile).meanCellWidth
    extent     = arcpy.Describe(infile).Extent
    pnt        = arcpy.Point(extent.XMin,extent.YMin)

    # save the raster
    out_ras = arcpy.NumPyArrayToRaster(out_arr,pnt,cellsize1,cellsize2)
    arcpy.CopyRaster_management(out_ras,"outfile.tif")
    arcpy.DefineProjection_management("outfile.tif", spatialref)
