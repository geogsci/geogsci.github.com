---
title: "Dealing with no data using NumPy masked array operations"
layout: "post"
---

Remotely sensed data can be riddled with no data (or null) values. Take this
grid of sea surface chlorophyll A (CHLa) concentration for example, which represents 8 days worth of repeat observations and still has lots of big data gaps (shown in black). With products such as these that use optical data as their input, cloud cover is always going to be a problem.

![CHLa concentration](/assets/posts/chla_8day_2013.png)
_Aqua MODIS CHLa concentration, 8 day composite, 01/01/2013 - 08/01/2013_
_([oceancolor.gsfc.nasa.gov])_

If you wanted to do any raster processing with this data, identifying no data gaps as invalid is essential. And if you're creating your own processing scripts, it can become problematic. 

You could simply build in conditions to ignore this number. However, I find a much nicer way to deal with no data if using Python, is with [NumPys masked array operations](http://docs.scipy.org/doc/numpy/reference/maskedarray.html). They lend themselves really well to remote sensing analysis. With a basic example, here's how this can work.

(Please assume all my one dimensional arrays here are actually two dimensional and represent raster values! Of course you first need to [convert your raster into a NumPy array](http://blog.remotesensing.io/2013/03/using-gdal-with-python-basic-intro/).)
    
    {% highlight python %}
    >>> import numpy as np 
    >>>
    >>> x = np.array([1, 2, 3, 99, 5, 6, 99])
    >>> y = numpy.ma.masked_values(x, 99)
    >>> y.mask
    array([False, False, False,  True, False, False,  True], dtype=bool)
    >>> y.data
    array([ 1,  2,  3, 99,  5,  6, 99])
    >>> y
    masked_array(data = [1 2 3 -- 5 6 --],
           mask = [False False False  True False False  True],
     fill_value = 99)
     {% endhighlight %}

If you want to visually display where your no data cells are in a GIS, you can easily change the mask into an integer array and then save it out in a visual format.
  
    {% highlight python %}
    >>> intarray = y.mask.astype(int)
    >>> intarray
    array([0, 0, 0, 1, 0, 0, 1])
    {% endhighlight %} 

Equally powerful, if you already have a mask raster, you can build the mask and the data part of the masked array yourself.


    {% highlight python %}
    >>> t = ma.array([1,2,3,4,4], mask=[0,0,0,0,1])
    >>> t
    masked_array(data = [1 2 3 4 --],
                 mask = [False False False False  True],
           fill_value = 999999)
    {% endhighlight %}

Once you have assigned your masked array, there are a number of other methods
which can be applied, for example:
 

    {% highlight python %} 
    >>> y.mean()
    3.4
    >>> y.max()
    6
    >>> y.sum()
    17
    {% endhighlight %}

These are basic operations only. The [documentation for masked array operations](http://docs.scipy.org/doc/numpy/reference/routines.ma.html#) shows the range of possibilities. I've used masked arrays very frequently when developing bespoke raster processing scripts.
