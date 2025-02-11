    

mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0ZTUyNSIsImEiOiJjbTZoc3drbnEwMTV2MmtwZnRwM2V4dHpoIn0.EHPHcqnoXFCNpcQYlqAObA';



const map = new mapboxgl.Map({
    container: 'map',
    minZoom: 7,
    style: 'mapbox://styles/cate525/cm6qmdg8c00y101qrcicu5v4e',
    center: [-1.388365, 53.055032],
    zoom: 6.13
});
let globalMode = 'pt'
let globalMetric = 'div_wea_col'
let vmin = 0;
let vmax = 1;

function reColor (vmin, vmax){
    return(
        {
        'cum_AB': [vmin, '#fff5f0', 
                     vmin + .125*(vmax-vmin), '#fee0d2',
                     vmin + .25*(vmax-vmin), '#fcbba1',
                     vmin + .375*(vmax-vmin), '#fc9272',
                     vmin + .5*(vmax-vmin), '#fb6a4a',
                     vmin + .625*(vmax-vmin), '#ef3b2c',
                     vmin + .75*(vmax-vmin), '#cb181d',
                     vmin + .875*(vmax-vmin), '#a50f15',
                     vmin + 1*(vmax-vmin), '#67000d'],
        'ent_inc': [vmin, '#f7fbff', 
                     vmin + .125*(vmax-vmin), '#deebf7',
                     vmin + .25*(vmax-vmin), '#c6dbef',
                     vmin + .375*(vmax-vmin), '#9ecae1',
                     vmin + .5*(vmax-vmin), '#6baed6',
                     vmin + .625*(vmax-vmin), '#4292c6',
                     vmin + .75*(vmax-vmin), '#2171b5',
                     vmin + .875*(vmax-vmin), '#08519c',
                     vmin + 1*(vmax-vmin), '#08306b'],
        'div_wea_col': [vmin, '#f7fbff', 
                     vmin + .125*(vmax-vmin), '#deebf7',
                     vmin + .25*(vmax-vmin), '#c6dbef',
                     vmin + .375*(vmax-vmin), '#9ecae1',
                     vmin + .5*(vmax-vmin), '#6baed6',
                     vmin + .625*(vmax-vmin), '#4292c6',
                     vmin + .75*(vmax-vmin), '#2171b5',
                     vmin + .875*(vmax-vmin), '#08519c',
                     vmin + 1*(vmax-vmin), '#08306b'],
    })};

    
let colorPals = reColor(0,1)

map.on('load', () => {
    const layers = map.getStyle().layers;
    const firstSymbolId = layers.find(layer => layer.type === "symbol")?.id;
    // const firstSymbolId = layers.find(layer => layer.id.includes("road")).id;

    // Sources
    const sources = {
        lsoa: 'mapbox://cate525.b7ytwoco',
        msoa: 'mapbox://cate525.dlgdvnnw',
        msoa_simple: 'mapbox://cate525.9dh5n7yg',
        streets: "mapbox://mapbox.mapbox-streets-v8"
    };

    Object.entries(sources).forEach(([id, url]) => {
        map.addSource(id, { type: 'vector', url });
    });

    // Layer Configurations
    const modes = ['pt', 'bi', 'dr'];
    const scales = ['lsoa', 'msoa', 'msoa_simple'];
    const sourceLayers = {
        lsoa: 'lsoa-1z1gak',
        msoa: 'msoa-6dbeat',
        msoa_simple: 'msoa_simple-2dgnjn'
    };
    const minZoom = { lsoa: 9, msoa: 8, msoa_simple: 0 };
    const maxZoom = { lsoa: 22, msoa: 9, msoa_simple: 8 };
    const visibility = { bi: 'none', pt: 'visible', dr: 'none' };
    


    // Add Layers
        scales.forEach(scale => {
            map.addLayer({
                id: `${scale}`,
                metadata: { mapscale: scale },
                type: 'fill',
                minzoom: minZoom[scale],
                maxzoom: maxZoom[scale],
                source: scale,
                'source-layer': sourceLayers[scale],
                layout: { visibility: 'visible' },
                paint: {
                    'fill-color': 
                        ['rgb',['get', `div_wea_col_${globalMode}_180_r`],['get', `div_wea_col_${globalMode}_180_g`],['get', `div_wea_col_${globalMode}_180_b`]],
                    'fill-opacity':.8
                    

                }
            }, firstSymbolId);
        });

});



map.on('idle', () => {
    const readable = {
        relative: 'Rescale to frame',
        absolute: 'Absolute rank',
        pt: 'Transit',
        bi: 'Biking',
        dr: 'Driving',
        wea: 'Wealth',
        div: 'Diversity',
        both: 'Both'
    };

    
    
    const toggleableScalings = ['relative'];
    const toggleableLayerGrps = ['pt', 'bi', 'dr'];
    const toggleableMetrics = ['wea', 'div'];

    // Utility function to create toggle buttons
    function createToggleButton(id, menuId, callback, defaultClass = '') {
        if (document.getElementById(id)) return;

        const link = document.createElement('a');
        link.id = id;

        link.href = '#';
        link.textContent = readable[id] || id;
        if((id===globalMode)|(id===globalMetric)){link.className = 'active';}else{link.className = defaultClass;}
        link.onclick = callback;

        document.getElementById(menuId).appendChild(link);
    }

    // Scaling Toggle
    toggleableScalings.forEach(id => {
        createToggleButton(id, 'scaling_menu');
    });


    // Mode Toggle
    toggleableLayerGrps.forEach(id => {
        createToggleButton(id, 'mode_menu', function (e) {
            // e.preventDefault();
            // e.stopPropagation();
            globalMode = id;

            toggleableLayerGrps.forEach(otherId => {
                document.getElementById(otherId).className = otherId === id ? 'active' : '';
            });

            
        })

    });

    // Metric Toggle
    toggleableMetrics.forEach(id => {
        createToggleButton(id, 'metric_menu', function () {
            this.classList.toggle('active');

            const activeWea = document.getElementById('wea').classList.contains('active');
            const activeDiv = document.getElementById('div').classList.contains('active');

            if (activeWea && activeDiv) {
                globalMetric = 'div_wea_col';
                document.getElementById('scaling_menu').style.opacity = .2;

                var slideritems = document.getElementsByClassName('slider-container');
                for(i=0; i<slideritems.length; i++) {
                    slideritems[i].style.opacity = .2;
                }
                document.querySelectorAll('.box,.w,.d').forEach(box => box.style.opacity = 1);
            } else if (activeWea) {
                globalMetric = 'cum_AB';
                document.getElementById('scaling_menu').style.opacity = 1;
                var slideritems = document.getElementsByClassName('slider-container');
                for(i=0; i<slideritems.length; i++) {
                  slideritems[i].style.opacity = 1;
                }
                document.querySelectorAll('.w').forEach(box => box.style.opacity = 1);
                document.querySelectorAll('.box:not(.w),.d:not(.w)').forEach(box => box.style.opacity = 0.2);
            } else if (activeDiv) {
                globalMetric = 'ent_inc';
                document.getElementById('scaling_menu').style.opacity = 1;
                var slideritems = document.getElementsByClassName('slider-container');
                for(i=0; i<slideritems.length; i++) {
                  slideritems[i].style.opacity = 1;
                }
                document.querySelectorAll('.d').forEach(box => box.style.opacity = 1);
                document.querySelectorAll('.box:not(.d),.w:not(.d)').forEach(box => box.style.opacity = 0.2);
            } else {
                globalMetric = 'none';
                document.getElementById('scaling_menu').style.opacity = .2;
                var slideritems = document.getElementsByClassName('slider-container');
                for(i=0; i<slideritems.length; i++) {
                  slideritems[i].style.opacity = .2;
                }
                document.querySelectorAll('.box,.w,.d').forEach(box => box.style.opacity = 0.2);
            }

            

        }, 'active');
    });

    
    const scalingMenu = document.getElementById("scaling_menu");
    const modeMenu = document.getElementById("mode_menu");
    const metricMenu = document.getElementById("metric_menu");


    // Function for both button A and B
    function clickRerender(event) {
        let nextColor;
        vmin = round(minRange.value/100,2);
        vmax = round(maxRange.value/100,2);
        colorPals = reColor(vmin,vmax)
        
        if (globalMetric === 'div_wea_col'){nextColor=['rgb',['get', `div_wea_col_${globalMode}_180_r`],['get', `div_wea_col_${globalMode}_180_g`],['get', `div_wea_col_${globalMode}_180_b`]]}
        else if(globalMetric === 'none'){nextColor='transparent'}
        else{nextColor = ['interpolate-hcl', ['linear'], ['get', `${globalMetric}_${globalMode}_180_rk`], ...colorPals[globalMetric]]};
        const scales = ['lsoa','msoa','msoa_simple'];
        scales.forEach(scale => {
            map.setPaintProperty(`${scale}`, 'fill-color', nextColor);
            map.setPaintProperty(`${scale}`, 'fill-opacity', .8);

        });
    }

        // Function for both button A and B
    function clickRerender_fitframe(event) {
        const visibleFeatures = map.queryRenderedFeatures({ layers: ['lsoa','msoa','msoa_simple'] });
        if (visibleFeatures.length === 0) return;

        const values = visibleFeatures.map(f => f.properties[`${globalMetric}_${globalMode}_180_rk`]);
        minRange.value = d3.quantile(values,.01)*100;
        maxRange.value = d3.quantile(values,.99)*100;

        clickRerender(event)
    }

    // Attach event listeners
    modeMenu.addEventListener("click", clickRerender);
    scalingMenu.addEventListener("click", clickRerender_fitframe);
    metricMenu.addEventListener("click", clickRerender);


    const minRange = document.getElementById("minRange");
    const maxRange = document.getElementById("maxRange");
    const rangeTrack = document.getElementById("rangeTrack");
    const minValueText = document.getElementById("minValue");
    const maxValueText = document.getElementById("maxValue");
    const minGap = .1; // Minimum gap between sliders

    function round(num, places) {
        var multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }
    function updateSlider(event) {
        let minVal = round(minRange.value,2);
        let maxVal = round(maxRange.value,2);

        // Ensure min is always less than max
        if (maxVal - minVal < .01) {
            if (event.target === minRange) {
                minRange.value = maxVal - minGap;
            } else {
                maxRange.value = minVal + minGap;
            }
            minVal = (minRange.value);
            maxVal = (maxRange.value);
        }

        // Update the display values
        minValueText.textContent = minVal;
        maxValueText.textContent = maxVal;

        // Update the track fill position
        let percentMin = (minVal / 100) * 100;
        let percentMax = (maxVal / 100) * 100;

        vmin = minVal/100
        vmax = maxVal/100
        console.log(minVal/100)
        console.log(maxVal/100)
        rangeTrack.style.left = (percentMin+2) + "%";
        rangeTrack.style.width = (percentMax - percentMin)  + "%";
    }

    minRange.addEventListener("input", updateSlider);
    maxRange.addEventListener("input", updateSlider);
    minRange.addEventListener("input", clickRerender);
    maxRange.addEventListener("input", clickRerender);

    // Initialize the slider positions
    updateSlider(new Event("input"));



});


