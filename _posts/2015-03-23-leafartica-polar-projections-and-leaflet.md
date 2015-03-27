---
title: "Leafarctica: polar projections in Leaflet
layout: "post"
---

I decided it was about time I made a web map using [Leaflet](http://leafletjs.com/). 

To help make something really excellent, I teamed up with OrangeMug, and together we created [Leafarctica](http://lo-ise.github.io/leafarctica). 

![Leafarctica](/assets/posts/leafarctica.png)

We used a brilliant dataset of [daily Antarctic MODIS imagery from GIBS](https://earthdata.nasa.gov/about-eosdis/science-system-description/eosdis-components/global-imagery-browse-services-gibs) and implemented an idea for a really simple viewer with date selector.

Why polar focussed?

Because as with most things in web mapping, all seems very simple until you want to use a projection that is not [web mercator](http://en.wikipedia.org/wiki/Web_Mercator). So this added a nice, challenging component to the plan. 

Here's a walk through of the features we explored and used. 

1. We used the [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) addon to add support for [Antarctic Polar Stereographic (EPSG: 3031)](http://spatialreference.org/ref/epsg/wgs-84-antarctic-polar-stereographic/). We found this to be well documented and pretty straight forward to use. 

2. We were really impressed that [Leaflet.Graticule](https://github.com/turban/Leaflet.Graticule) plugin worked beautifully on this projection. 

3. Antarctica is big. So when zooming around the imagery, it is easy to loose track of where you are. We tried to implement the [Leaflet-MiniMap](https://github.com/Norkart/Leaflet-MiniMap) plugin. However, we didn't have much success in getting this to work. We think it's an issue with the not using straight forward web mercator, but more investigation is required.  

4. [Leaflet-hash](http://mlevans.github.io/leaflet-hash/) is used to retain the current map view when switching between imagery dates. 

5. Fit to bounds didn't work, we think because of a bug that is particularly problematic when operating close to zero coordinates (inevitable with polar projections). OrangeMug succesfully hacked a solution to this by setting viewable extent of the map using pixel coordinates of the corners of the dataset, depending on zoom level. 

If you want to look more closely at this pretty simple implementation, head to th repo on GitHub. 

In the meantime, I'm continuiing to use this project as a way to learn and experiment with Leaflet, polar data and projections.

Thanks OrangeMug!
(put in photo of OrangeMug)
