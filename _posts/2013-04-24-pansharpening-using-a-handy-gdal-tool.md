---
title: "Pansharpening with a handy GDAL tool"
layout: "post"
---
I found [this set of GDAL tools](https://github.com/gina-alaska/dans-gdal-scripts) recently which I've found to be really useful. I thought it would be good to show some of these in action.

`gdal_landsat_pansharp` is one of these tools and allows easy and effective pansharpening of Landsat ETM images (I haven't tried it on images from other sensors). It's handy as it allows quick pansharpening even if you haven't composited bands from a [freshly downloaded Landsat image](http://blog.remotesensing.io/2013/03/landsat-imagery-search-download-display/), for example:

    gdal_landsat_pansharp -rgb band3.tif -rgb band2.tif -rgb band1.tif \
    -lum band4.tif 0.52 -lum band3.tif 0.23 -lum landsat2.tif 0.25 \
    -pan band8.tif -ndv 0 -o outimage.tif

The `-rgb` option is used for each input band, the `-lum` option is used to simulate a low resolution panchromatic band, each band requires a weighting (0-1). `-pan` is needed to select the panchromatic band (band 8 for Landsat ETM), `-ndv` to specify a no data value and finally `-o` to give an output filename.

Alternatively, if you already have a true colour (bands 3, 2, 1) composite:

    gdal_landsat_pansharp -rgb rgbimage.tif \
    -lum band2.tif 0.25 -lum band3.tif 0.23 -lum landsat4.tif 0.52 \
    -pan band8.tif -ndv 0 -o outimage.tif

It also works nicely to quickly pansharpen false colour composites, using the same `-lum` settings. For example, for a 432 composite:

    gdal_landsat_pansharp -rgb band4.tif -rgb band3.tif -rgb band2.tif \
    -lum band4.tif 0.52 -lum band3.tif 0.23 -lum landsat2.tif 0.25 \
    -pan band8.tif -ndv 0 -o outimage.tif

A quick read of the tools [wiki page](https://github.com/gina-alaska/dans-gdal-scripts/wiki/Gdal_landsat_pansharp) points us to [this paper](http://www.dpi.inpe.br/~leila/publications/boggione2003spb.pdf) in order to derive the weightings for the low resolution simulated image. I also refer you to the [wiki page](https://github.com/gina-alaska/dans-gdal-scripts/wiki/Gdal_landsat_pansharp) for further information on the maths behind the technique.

Here's some results:

A true colour (bands 3, 2, 1) image of Abisko National Park in Sweden, 30m spatial resolution

![Landsat RGB image](/assets/posts/landsat-abisko-rgb.png)

The panchromatic band, 15m spatial resolution 

![Landsat panchromatic image](/assets/posts/landsat-abisko-pan.png)

And the pansharpened image

![Landsat pansharpened RGB image](/assets/posts/landsat-abisko-panrgb.png)

Finally, a false colour (bands 4, 3, 2) pansharpened image

![Landsat pansharpened FCC image](/assets/posts/landsat-abisko-pan432.png)
_Landsat scene ID: LE71980121999227SGS00_
_date: 15/08/1999_
