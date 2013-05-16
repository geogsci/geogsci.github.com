---
layout: post
title: "Installing GDAL on Ubuntu"
---
[GDAL](http://www.gdal.org/) is amazing. I use it everyday for various raster handling tasks, such as converting weird file formats to more useable ones, reprojecting and querying datasets. 

Below is a quick guide to getting GDAL command line utilities up and running on Ubuntu. 

First of all you will need to add the [UbuntuGIS](http://wiki.ubuntu.com/UbuntuGIS) repository. Using a text editor, open the file `/etc/apt/sources.list` and add the following lines:

    deb http://ppa.launchpad.net/ubuntugis/ppa/ubuntu <codename> main 
    deb-src http://ppa.launchpad.net/ubuntugis/ppa/ubuntu <codename> main

Next, you will need to update the list of available packages. Open a terminal and type the following:

    sudo apt-get update

Once this has been done, it is possible to install any of the packages available through the UbuntuGIS repository. For a list of all available packages, see <https://wiki.ubuntu.com/UbuntuGIS/PackageList>

Alternatively, as we know we want to install GDAL, simply type the following:

    apt-cache search gdal

This will bring up a list of all packages that have 'gdal' in the description/title. So if we type:

    sudo apt-get install gdal-bin

You should also install python bindings, which can be really useful for tools such as [gdal_merge.py](http://www.gdal.org/gdal_merge.html) and [gdal_retile.py](http://www.gdal.org/gdal_retile.html)

You're ready to start using GDAL.
