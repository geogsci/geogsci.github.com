---
title: "Some useful GDAL tools: gdal_trace_outline"
layout: "post"
---
I found [this set of GDAL tools](https://github.com/gina-alaska/dans-gdal-scripts) recently which i've found to be really useful. I thought it would be fun to show some of these in action.

`gdal_trace_outline` is the only easy way of producing image footprint polygons that I've come across, which will work with irregular shaped images and images which are projected to a non regular shape. It seems to work from a computer vision standpoint rather than just calculating the minimum and maximum bounds of an image. I've often used this to produce shapefiles of image footprints, for example: 

    gdal_trace_outline -ndv 0 -out-cs en -dp-toler 10 -ogr-out outline.shp [in image]

![Trace outline example]( /assets/posts/trace-outline-example1.png)

With an image such as this Landsat scene, using default settings you will probably end up with a polygon with a ridiculous number of vertices, as the image will often have uneven edges. So experiment with the -dp-toler option in order to generalise the outline. For example, the blue outline below was created with default settings, and the green with -dp-toler 10 :

![Trace outline example]( /assets/posts/trace-outline-example2.png)

More examples of using these tools to follow.

