---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: custom_home
---
<head>
	<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            gap: 20px;
            padding: 20px;
        }
        .thumbnail {
            flex: 0 1 calc(33.333% - 20px);
            text-align: center;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
        }

        .thumbnail img {
            width: 100%;
            height: auto;
            border-radius: 50%;
            object-fit: cover;
            filter: grayscale(100%);
            border: 1px solid darkslategrey;


        }

        .thumbnail img:hover { 
            filter: grayscale(0%);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .title {
            font-size: 1.2em;
            margin-top: 10px;
            font-weight: bold;
        }
        .description {
            font-size: 1em;
            color: #555;
            margin-top: 5px;
        }
        @media (max-width: 768px) {
            .gallery {
                flex-direction: row;
            }
            .thumbnail {
                flex: 0 1 calc(50% - 20px);
            }
        }
        @media (max-width: 480px) {
            .thumbnail {
                flex: 0 1 100%;
            }
        }
        .bio_image{
        	width:0%;
        	float:left;
        	padding: 30px;
        }
        .bio_image img{
        	border-radius: 0%;
        }
        .bio{
        	width:100%;
        	float:left;
        }
	</style>
</head>

<div class="bio_image">
            <img src="assets/img/headshot2.jpg" alt="Thumbnail 1">
            
</div>

<div class = "bio">
<h1> Hi, I'm Cate! </h1>
<p>I'm a geospatial data scientist who is passionate about using data and technology to aid in designing more efficient, liveable, and sustainable urban systems.</p>

<p>Currently, I am a Research Fellow in Urban Mobility and Inequality in the <a href = 'https://www.ucl.ac.uk/bartlett/casa/'>Centre for Advanced Spatial Analysis</a> at UCL, where I work on the <a href='https://smartcityanalysis.com/'>realTRIPS project</a>.</p>

<p>Before joining CASA, I received my PhD from the <a href = 'idss.mit.edu'>Institute for Data, Systems, and Society</a> at MIT. My <a href = 'https://www.proquest.com/docview/3132853856?pq-origsite=gscholar&fromopenview=true&sourcetype=Dissertations%20&%20Theses'>PhD research</a> focused on using large-scale human mobility datasets to study the impact of urban design choices on social mixing and experienced segregation in cities.</p>
</div>

<div class="gallery">
        <div class="thumbnail">
            <img src="assets/img/img1.png" alt="Thumbnail 1">
            <div class="title">Thumbnail 1</div>
            <div class="description">This is a description for the first image.</div>
        </div>
        <div class="thumbnail">
            <img src="assets/img/img2.png" alt="Thumbnail 2">
            <div class="title">Thumbnail 2</div>
            <div class="description">This is a description for the second image.</div>
        </div>
        <div class="thumbnail">
            <img src="assets/img/img3.png" alt="Thumbnail 3">
            <div class="title">Thumbnail 3</div>
            <div class="description">This is a description for the third image.</div>
        </div>
</div>