---
title: "Antarctic adventures part 1: creating a geo-blog"
layout: "post"
---

I have recently returned from a month long trip to Antarctica and had a lot of fun blogging about my experiences over at [Geoarctica](http://lo-ise.github.io/geoarctica).


In the run up to my trip, I was often faced with blank expressions when I tried to explain to people where I was going, and more specifically what I would be doing over there. So I was keen to be able to communicate my journeys by harnessing the power of mapping, loosly inspired by [Strava](http://www.strava.com). 

This is part 1 of two posts about Geoarctica and blogging from the far South.

![Geoarctica](assets/posts/geoarctica.png)


##A nice bespoke blog

Confession... I didn't create the blog itself. I have [@orangemugdev](https://twitter.com/orangemugdev) to thank for that. It would have been nice to learn some new skills and put something together myself, but I ran out of time. After explaining my vision, I ended up with something really excellent that I was very excited to start using.

##The maps

The original plan was to use a polar projected map with MODIS imagery acquired on the day of the post as the basemap, similar to another recent project of ours, [Leafarctica](http://lo-ise.github.io/leafarctica). But I only gave [@orangemugdev](https://twitter.com/orangemugdev) one day to get this up and running (terrible client...) and we came across some problems.

1. The MODIS imagery wouldn't have worked without a coastline to give it some context because of the large amount of cloud in each image. Since attempting to add a coastline to Leafarctica ourselves and not achieving anything satisfactory, someone else has done an excellent job of this! Check out [Leafarctica2](http://ajzeigert.github.io/leafarctica) by [@zeigert](https://twitter.com/zeigert).

2. The available zoom levels of the MODIS dataset did not allow for my smaller scale adventures around Rothera Point to be displayed. The [larger scale flying posts](http://lo-ise.github.io/geoarctica//2015/11/29/flying-around-antarctica.html) would look great, but the detail of [skiing](http://lo-ise.github.io/geoarctica//2015/10/24/saturday-afternoon-skiing.html) and [climbing](http://lo-ise.github.io/geoarctica//2015/11/15/climbing-around-reptile-ridge.html) for example, would be lost.

3. I really like the map tiles from Stamen Design that we settled on. However, they lack any kind of indication of what the ground looks like, which is where a satellite image basemap would have been nice.

Overall though, super chuffed and ready to go!
