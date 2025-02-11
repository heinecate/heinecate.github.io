---
layout: none
permalink: /soc-acc/

---

<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/assets/style_elements/realtrips_style.css">
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css" rel="stylesheet">
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.js"></script>
    <title>Social accessibility viz</title>
  </head>
  <body>
    <nav id="mode_menu" class="menu"></nav>
    <nav id="scaling_menu" class="menu"></nav>
    <nav id="metric_menu" class="menu"></nav>
    <div class="slider-container">
        <input type="range" id="minRange" class="slider" min="0" max="100" value="0">
        <input type="range" id="maxRange" class="slider" min="0" max="100" value="100">
        <div class="range-track" id="rangeTrack"></div>
        <div id="base-track"></div>
        <p id="minLabel">Min: <span id="minValue">0</span></p>
        <p id="maxLabel">Max: <span id="maxValue">100</span></p>
    </div>

    <pre class = "d" id="annotation1">highdiversity</pre>
    <pre class = "d" id="annotation2">low
diversity</pre>
    <pre class = "w" id="annotation3">low
wealth</pre>
    <pre class = "w" id="annotation4">high
wealth</pre>
    <div class="grid-container">
           
            <div class="box w d" id="one"></div> <div class="box d" id="two"></div> <div class="box d" id="three"></div> <div class="box d" id="four"></div>
            <div class="box w" id="five"></div> <div class="box" id="six"></div> <div class="box" id="seven"></div> <div class="box" id="eight"></div>
            <div class="box w" id="nine"></div> <div class="box" id="ten"></div> <div class="box" id="eleven"></div> <div class="box" id="twelve"></div>
            <div class="box w" id="thirteen"></div> <div class="box" id="fourteen"></div> <div class="box" id="fifteen"></div> <div class="box" id="sixteen"></div>
     </div>
    <div id="map"></div> 
    <script src="/assets/style_elements/realtrips_script.js"></script>
  </body>
</html> 