---
title: "Tracing rasters outlines with GDAL"
layout: "post"
---
Back to [this set of GDAL tools](https://github.com/gina-alaska/dans-gdal-scripts), that I've talked about [previously](http://blog.remotesensing.io/2013/04/pansharpening-using-a-handy-gdal-tool/).

`gdal_trace_outline` is an easy way of producing image footprint polygons, which will work with irregular shaped images and images which are projected to a non regular shape. So to trace an image and produce a shapefile outline polygon (in this case using a Landsat scene):

    gdal_trace_outline -ndv 0 -out-cs en -dp-toler 10 -ogr-out outline.shp [in image]

![Trace outline example]( /assets/posts/trace-outline-cornwall.png)

The green boundary is the output, `outline.shp`.

With an image such as this Landsat scene, you will probably end up with a polygon with a ridiculous number of vertices, as the image will often have uneven edges. So experiment with the `-dp-toler` option in order to generalise the outline. For example, the red outline below was created with default settings, and the green with `-dp-toler 10`:

![Trace outline example]( /assets/posts/trace-outline-edge.png)

