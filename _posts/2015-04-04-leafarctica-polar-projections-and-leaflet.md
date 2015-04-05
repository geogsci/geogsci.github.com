---
title: "Leafarctica: polar projections and Leaflet"
layout: "post"
---

I decided it was about time I made a web map using [Leaflet](http://leafletjs.com/). 

To help with this, I teamed up with [Orange Mug](http://github.com/orangemug), and together we created [Leafarctica](http://lo-ise.github.io/leafarctica). 

[![Leafarctica](/assets/posts/leafarctica.png)](http://lo-ise.github.io/leafarctica)

We used a nice dataset of [daily Antarctic MODIS imagery from GIBS](https://earthdata.nasa.gov/about-eosdis/science-system-description/eosdis-components/global-imagery-browse-services-gibs) and implemented an idea for a really simple viewer with date selector.

Why polar focussed?

Because when it comes to web mapping, all seems very simple until you want to use a projection that is not [web mercator](http://en.wikipedia.org/wiki/Web_Mercator). So this added a nice, challenging component to the plan. 

Here's a walk through of the features we explored and used. 

1. We used [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) to add support for [Antarctic Polar Stereographic (EPSG: 3031)](http://spatialreference.org/ref/epsg/wgs-84-antarctic-polar-stereographic/). We found this to be well documented and pretty straight forward to use. 

2. We were really impressed that [Leaflet.Graticule](https://github.com/turban/Leaflet.Graticule) plugin worked beautifully on this projection. 

3. Antarctica is big. So when zooming around the imagery, it's easy to loose track of where you are. We tried to implement the [Leaflet-MiniMap](https://github.com/Norkart/Leaflet-MiniMap) plugin. However, we didn't have much success in getting this to work. We think it's an issue with the not using straight forward web mercator, but more investigation is required.  

4. [Leaflet-hash](http://mlevans.github.io/leaflet-hash/) is used to retain the current map view when switching between imagery dates. 

5. `map.fitBounds()` wasn't working with our polar projection, so Orange Mug had to hack a solution. You can find it [here](https://github.com/lo-ise/leafarctica/blob/gh-pages/hacks/constrain-map-to-bounds.js). This isn't perfect however, because it stops any pan animation. 

If you want to look more closely at this pretty simple implementation, head to the [repo on GitHub](http://github.com/lo-ise/leafarctica/). 

In the meantime, I'm continuing to use this project as a way to learn and experiment with Leaflet.


![Orange Mug](/assets/posts/orangemug.jpeg)


Thanks Orange Mug!
