---
title: "Using PyQGIS in Mac OS X"
layout: "post"
---

The QGIS built in Python console is great. But the real power comes in being able to use PyQGIS in external scripts.

Without completing the following steps, you will encounter this situation when trying to import the modules:

    {% highlight python %}
    >>> import qgis.core
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    ImportError: No module named qgis.core
    {% endhighlight %}

The [PyQGIS developer cookbook](http://docs.qgis.org/testing/en/docs/pyqgis_developer_cookbook/intro.html) explains how to fix this problem for Windows and Linux, but not Mac. So Mac users, here's what you do.

Open your `~/.profile` for editing. Add the following lines:

    {% highlight bash %}
    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/Applications/QGIS.app/Contents/MacOS/lib/:/Applications/QGIS.app/Contents/Frameworks/

    export PYTHONPATH=$PYTHONPATH:/Applications/QGIS.app/Contents/Resources/python/

    export PATH=$PATH:/Library/Frameworks/GDAL.framework/Programs/
    {% endhighlight%}

Add this line to load external opengeo libraries, so you can save out your layers in various formats. Just swap out `Ireland` for whatever your Mac username is. 

    {% highlight bash %}
    export PYTHONPATH=$PYTHONPATH:/Users/Ireland/.qgis2/python/plugins/opengeo/ext-libs/
    {% endhighlight%}

Save this and type the following into the terminal.
    
    {% highlight bash %}
    source ~/.profile
    {% endhighlight%}

Now you will be able to import PyQGIS modules into any of your external scripts. 
