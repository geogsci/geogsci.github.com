---
title: "3D DEMs on the web"
layout: "post"
---

I've discovered an easy way to render DEMs in 3D online using GitHub. [GitHub can host and render 3D models](https://help.github.com/articles/3d-file-viewer). You can upload a 3D model and view it via your GitHub account online. You can also [embed the viewer](https://help.github.com/articles/3d-file-viewer#embedding-your-model-elsewhere) into a webpage, like this:	

<div class="threed-render" data-src="https://render.githubusercontent.com/view/3d?url=https://raw.githubusercontent.com/lo-ise/dem-visualisation/master/mountains.stl"></div>

You will need to get your DEMs into stl format. To do this, I exported my DEM into a point cloud x,y,z text file. I then loaded this into the freely available [MeshLab](http://meshlab.sourceforge.net/), created a surface from the points and exported it to stl format. [Detailed instructions can be found here](http://gmv.cast.uark.edu/scanning/point-clouds-to-mesh-in-meshlab/) on how to do this.  

Here's another one:

<div class="threed-render" data-src="https://render.githubusercontent.com/view/3d?url=https://raw.githubusercontent.com/lo-ise/dem-visualisation/master/island.stl"></div>

DISCLAIMER: I've found sometimes the models don't load with slow internet connections. If it doesn't work first time, try reloading. 
