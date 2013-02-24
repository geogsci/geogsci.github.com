---
title: "Landsat Imagery: search, download and display"
layout: "post"
---

With the launch of the new Landsat satellite last month, it's a great time of look back over some 40 years of continual high resolution multispectral data acquisition, achieved by the Landsat program. And with it's free data access policy, the Landsat archive represents a fantastic resource for students and researchers interested in remote sensing analysis. From a general interest point of view also, some of the images are stunning.

Although I completed a Masters degree in Remote Sensing, I was never actually taught how to search for and download Landsat data for myself. Although its not particularly complicated, I hope this post will help save interested people a bit of time in figuring out the best way to do this.

##Searching for the images

There are two access points to the archive, both run by the USGS. [GloVis](http://glovis.usgs.gov/) and [Earth Explorer](http://earthexplorer.usgs.gov/). I recommend the latter. It's newer and more intuitive, and runs without having to install a Java plugin! It's also probably one of the better online image searching sites i've come across. In order to download data from EarthExplorer, you must first register.

I think searching for images is pretty self explanatory. Under the data tab on the left, start by just selecting L7 ETM+ SLC-on (1999-2003). Data from Landsat 7 collected after 2003 unfortunately suffers from stripping. See for <http://landsat.usgs.gov/products_slcoffbackground.php> details. You can still use the small middle section of these images, but I find it unlikely you'll the feature you want an image of will conveniently be resting in the middle section! The benefit of Landsat 7 is the panchromatic band with 15m resolution.

##Data download

If images have been processed already, you will be able to download the GeoTiff straight away. If not, they will have to be added to the cart and sent off for processing. You will be notified by email when your images are ready for download, which usually takes a maximum of a couple of days.

##Visualising your images

Unfortunately, the data comes with each band as a separate image file. So to view as colour composite, you will need to merge these together. One way to do this is with [Quantum GIS](http://www.qgis.org/) or QGIS for short.

The tool you require within QGIS is called _Merge_. Which is hidden in the _Raster_ menu. If you select the Layer Stack option, you can stack any number single images together.

Command line options for layer stacking include gdal_merge.py (using the -separate option), and `gdal_merge_simple`. 

And here's the result of a quick search, download and visualisation of Cornwall as a false colour composite‚ nice.

![Landsat false colour composite]( /assets/posts/landsat-fcc-cornwall.png )



