/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

// Create source.
var urlPrefix = "tiles";
var id = "0-i-10-virtual-public-hearing_v4";
var source = Marzipano.ImageUrlSource.fromString(
  urlPrefix + "/" + id + "/{z}/{f}/{y}/{x}.jpg",
  { cubeMapPreviewUrl: urlPrefix + "/" + id + "/preview.jpg" });

// Create geometry.
var geometry = new Marzipano.CubeGeometry([
  {
    "tileSize": 256,
    "size": 256,
    "fallbackOnly": true
  },
  {
    "tileSize": 512,
    "size": 512
  },
  {
    "tileSize": 512,
    "size": 1024
  },
  {
    "tileSize": 512,
    "size": 2048
  },
  {
    "tileSize": 512,
    "size": 4096
  }
]);

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(4096, 100*Math.PI/180,  120*Math.PI/180);
var view = new Marzipano.RectilinearView({
        "pitch": 0,
        "yaw": 0,
        "fov": 1.0
      }, limiter);



// Create scene.
var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});

// Display scene.
scene.switchTo({ transitionDuration: 0 });
    

$("#move-to-board-2").click(function(event){
  var destinationViewParameters = {
    yaw: 0.4796227949846745,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-3").click(function(event){
  var destinationViewParameters = {
    yaw: 1.4473234353959414,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-4").click(function(event){
  var destinationViewParameters = {
    yaw: 1.931001957957501,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-5").click(function(event){
  var destinationViewParameters = {
    yaw: 2.906897069110694,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-6").click(function(event){
  var destinationViewParameters = {
    yaw: -2.8900468957781698,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-7").click(function(event){
  var destinationViewParameters = {
    yaw: -2.415730851182211,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-8").click(function(event){
  var destinationViewParameters = {
    yaw: -1.9342051768732595,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

$("#move-to-board-9").click(function(event){
  var destinationViewParameters = {
    yaw: -1.4503397532673823,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
});

/* $("#move-to-board-10").click(function(event){
  var destinationViewParameters = {
    yaw: -1.0537492064980238,
    pitch: 0.025,
    fov: 1
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);
}); */