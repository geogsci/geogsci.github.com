---
title: "Antarctic adventures part 2: geo-blogging from Antarctica"
layout: "post"
---

So I have a [great blogging platform](http://blog.remotesensing.io/2015/12/antarctic-adventures-part-1), now for the fun stuff. Geo-blogging from Antarctica and how I did it. 

I will divide up the types of geospatial data input that was loaded into [Geoarctica](http://lo-ise.github.io/geoarctica/) maps, into three main categories. Flight paths, activity tracks and static point and polygon features.

## Flight paths

My job when I was in Antarctica was to conduct an aerial photography survey campaign from a [Twin Otter](https://www.bas.ac.uk/polar-operations/sites-and-facilities/facility/twin-otter-aircraft/) aircraft.

The camera system consists of not only the actual sensor and lens, but also a GPS antenna and reciever, and an IMU (innertial measurement unit). By processing the outputs from the GPS and IMU, the position (or trajectory) of the aircraft can be determined to within centimetre level accuracy.

After each flight it was necessary to quality check the data from the GPS and IMU, and process up the trajectory. This gave me the data for the flight paths. 

![Flight paths](/assets/posts/flight-paths.png)

## Activity tracks

I made sure that whilst I was in Antarctica, I made use of the outdoor activity opportunities available at Rothera Research Station. To provide data for my geo-blog, I tracked many of these using my [Garmin Vivoactive](https://buy.garmin.com/en-GB/GB/wearables/wearables/vivoactive-/prod150767.html).

![Garmin Vivoactive](/assets/posts/garmin-vivoactive-wrist.jpg)

I bought my Vivoactive last summer and I love it. Apart from logging my daily steps and sleep patterns, it also has GPS functionality for tracking activities. Perfect for quickly switching on for spontaneous skiing, boat trips, climbing and walks. 

![Leela](/assets/posts/leela-wristband.jpg)

There were a few steps I had to go through to create geojson to upload to Geoarctica. 

1. Garmin FIT files were transferred from the Vivoactive onto my laptop, using the freely available Garmin Basecamp.
![](/assets/posts/garmin-basecamp.png)
 
2. These were exported into GPX format using Garmin Basecamp.
3. I then loaded the GPX tracks layer into [QGIS](http://www.qgis.org/), simplified the geometry if required and exported to a geojson format layer.

## Static points and polygon features

These were static points with pop ups enabled, helping to illustrate posts such as [this](http://lo-ise.github.io/geoarctica//2015/11/06/boat-trip.html)...

![Boat trip](/assets/posts/boat-trip.png)

... and a set of polygon features which I used in a [few](http://lo-ise.github.io/geoarctica//2015/10/26/the-hanger-camera-fitting.html) [posts](http://lo-ise.github.io/geoarctica//2015/11/05/fuchs-house.html) to show the building layout on station. 

![Building polygons](/assets/posts/buildings-layout.png)

These features were all digitised using trusty [QGIS](http://www.qgis.org/). The buildings were traced from a high resolution aerial photograph, and I created point features with a 'popup' attribute, as required.






