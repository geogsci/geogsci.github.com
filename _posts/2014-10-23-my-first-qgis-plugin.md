---
title: "My first QGIS plugin"
layout: "post"
---

I have created my first complete QGIS plugin. Introducing the [Sea Ice Concentration Downloader](http://seaicedata.remotesensing.io).

The plugin downloads sea ice concentration data of Antarctica within a time range, does a few data conversions, then displays the results in QGIS. 

![Downloader interface](/assets/posts/interface.png)

[The dataset](http://nsidc.org/data/nsidc-0051) is derived from spaceborne microwave radiometer readings of brightness temperature from a series of satellites, and is designed to be a consistent time series going back to 1978. A complete picture of the sea ice conditions is produced everyday, gridded at 25km resolution. Refer to [official docs](http://nsidc.org/data/nsidc-0051) for more info.

![Sea ice concentration January 2013](/assets/posts/sea_ice_map.png)

As with all QGIS plugins, installaton is easy and is explained [here](http://seaicedata.remotesensing.io). I'm hoping to add more features in the future and potentially add it to the official QGIS plugin repo.

