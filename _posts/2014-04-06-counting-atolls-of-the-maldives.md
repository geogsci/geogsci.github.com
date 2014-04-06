---
title: "Counting atolls of the Maldives"
layout: "post"
---

![landsat7_maldivesrgb](/assets/posts/maldives_rgb.png)

How many atolls are in this Landsat image of the Northern Maldives? 

This isn't really a question that needs answering, but it is quite fun to come up with a fairly accurate count based on simple morphology and thresholding operations. 

By eye, I've counted a total of 34 atolls, all differing in size and characteristics with varying texture across and between each atoll. Helpfully, they are all set against a relatively homogeneous backdrop (the darker sea). 

Pythons [scikit-image](http://scikit-image.org/) is a collection of algorithms for image processing and computer vision. It contains a number of packages for segmentation, filtering, morphology and colour manipulation, amongst others. It also has nice documentation. 

This post demonstrates using morphological opening and closing and thresholding with the [Otsu method](http://en.wikipedia.org/wiki/Otsu's_method) to count the atolls. 

Firstly, the image needs to be [read in as a NumPy array](http://blog.remotesensing.io/2013/03/using-gdal-with-python-basic-intro) and its projection and geotransform information recorded. Then later on, we can save out any results as image files.
 
    {% highlight python %}
    from osgeo import gdal
    import numpy as np
    from skimage.filter import thresholding
    from skimage import morphology
    from scipy.ndimage import measurements

    data  = gdal.Open('maldives.tif')
    im    = data.ReadAsArray()
    trans = data.GetGeoTransform()
    proj  = data.GetProjection()
    [dims, cols, rows] = im.shape
    {% endhighlight %}


##Morphological opening
This is defined as an erosion followed by a dilation. By passing a window of a certain size over an image, it will emphasize the lighter areas that are larger than the window and suppress the light areas that are smaller. The window can be a rectangular array, or a disk (by using the inbuilt [disk constructor in scikit-image](http://scikit-image.org/docs/dev/api/skimage.morphology.html#skimage.morphology.disk)). The result of this is that the small sun glints on the sea will be suppressed, while the atolls will be enhanced, making an automated thresholding much more effective.

By using all bands and summing the result to create a grayscale image, the atolls have a higher pixel value than the surrounding sea. Making use of all bands in this way ensures all available information which helps define the atolls is retained. 

    {% highlight python %}
    # after some testing, a disk with a radius if 4 pixels seem to work the best.
    selem = morphology.disk(4)

    red_open = morphology.opening(im[2,...], selem)
    gre_open = morphology.opening(im[1,...], selem)
    blu_open = morphology.opening(im[0,...], selem)    
    
    all_open = red_open + gre_open + blu_open
    {% endhighlight %}


Saving `all_open` to an image file gives you this.

![morphological_opening](/assets/posts/maldives_opening.png)

##Thresholding
Ultimately we need a binary image, so the objects can be counted computationally. Using the Otsu method, we can automatically select a threshold which will bring out the clusters of brighter objects.

Lets add to the code.

    {% highlight python %}
    thresh = thresholding.threshold_otsu(all_open)
    bin_im = all_open > thresh
    {% endhighlight %}

Using the selected threshold value generated from the Otsu algorithm, we can create `bin_im` which gives a value of 0 to all pixels below `thresh` and 1 to pixels higher.

Saving out `bin_im`, we get this. 

![thresholded image](/assets/posts/maldives_thresh.png)

Counting the objects in this image will results in a value of 166. Much too high. We need to close the smaller black areas.

##Morphological closing
Closing is exactly the opposite to opening, and is defined by a dilation followed by an erosion, effectively closing the darker areas depending on the size of the defined window. Then we can count the white areas as follows:

    {% highlight python %}
    selem   = morphology.disk(9)
    bin_im2 = morphology.closing(bin_im, selem)

    labels, nbr_objs = measurements.label(bin_im2)
    print nbr_objs
    {% endhighlight %}  

This `measurements.label` function from [scipy](http://docs.scipy.org/doc/scipy-0.13.0/reference/generated/scipy.ndimage.measurements.label.html) allows the output of a `labels` array, giving a grayscale image showing each object as a different value. Also we get an integer number of objects.  

In this case `nbr_objs` has given us a value of 32. Which is pretty close to the true number.

We now have the count, so time to save the resultant `bin_im2` to a georeferenced image file.

    {% highlight python %}
    outdata = gdal.GetDriverByName("GTiff")
    dst_im  = outdata.Create('maldives_binary.tif', rows, cols, 1, gdal.GDT_Byte)
    band    = dst_im.GetRasterBand(1)
    dst_im.SetGeoTransform(trans)
    dst_im.SetProjection(proj)
    band.WriteArray(bin_im2)

    outdata = gdal.GetDriverByName("GTiff")
    dst_im  = outdata.Create('maldives_labels.tif', rows, cols, 1, gdal.GDT_Byte)
    band    = dst_im.GetRasterBand(1)
    dst_im.SetGeoTransform(trans)
    dst_im.SetProjection(proj)
    band.WriteArray(labels)
    {% endhighlight %}

![morphological closing](/assets/posts/maldives_binary.png)

There are a few omission and commission errors. But the varying size of the atolls makes this hard to correct. All the larger atolls have been accounted for and some of the smaller ones too. This is a simple technique demonstrating the use of [scikit-image](http://scikit-image.org/) on satellite imagery. 
