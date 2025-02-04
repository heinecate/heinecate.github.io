mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0ZTUyNSIsImEiOiJjbTZoc3drbnEwMTV2MmtwZnRwM2V4dHpoIn0.EHPHcqnoXFCNpcQYlqAObA';

const map = new mapboxgl.Map({
    container: 'map',
    minZoom: 7,
    style: 'mapbox://styles/mapbox/light-v11',
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
    const firstSymbolId = layers.find(layer => layer.type === 'symbol')?.id;

    // Sources
    const sources = {
        lsoa: 'mapbox://cate525.b7ytwoco',
        msoa: 'mapbox://cate525.dlgdvnnw',
        msoa_simple: 'mapbox://cate525.9dh5n7yg'
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
                        ['rgb',['get', `div_wea_col_${globalMode}_180_r`],['get', `div_wea_col_${globalMode}_180_g`],['get', `div_wea_col_${globalMode}_180_b`]]

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

    
    
    const toggleableScalings = ['absolute', 'relative'];
    const toggleableLayerGrps = ['pt', 'bi', 'dr'];
    const toggleableMetrics = ['wea', 'div'];

    // Utility function to create toggle buttons
    function createToggleButton(id, menuId, callback, defaultClass = '') {
        if (document.getElementById(id)) return;

        const link = document.createElement('a');
        link.id = id;

        link.href = '#';
        link.textContent = readable[id] || id;
        if((id===globalMode)|(id===globalMetric)|(id==='absolute')){link.className = 'active';}else{link.className = defaultClass;}
        link.onclick = callback;

        document.getElementById(menuId).appendChild(link);
    }

    // Scaling Toggle
    toggleableScalings.forEach(id => {
        createToggleButton(id, 'scaling_menu', function () {
            toggleableScalings.forEach(otherId => {
                document.getElementById(otherId).className = otherId === id ? 'active' : '';
            });
            if (id === 'absolute'){colorPals = reColor(0,1)}
        });
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
                document.querySelectorAll('.box,.w,.d').forEach(box => box.style.opacity = 1);
            } else if (activeWea) {
                globalMetric = 'cum_AB';
                document.querySelectorAll('.w').forEach(box => box.style.opacity = 1);
                document.querySelectorAll('.box:not(.w),.d:not(.w)').forEach(box => box.style.opacity = 0.25);
            } else if (activeDiv) {
                globalMetric = 'ent_inc';
                document.querySelectorAll('.d').forEach(box => box.style.opacity = 1);
                document.querySelectorAll('.box:not(.d),.w:not(.d)').forEach(box => box.style.opacity = 0.25);
            } else {
                globalMetric = 'none';
                document.querySelectorAll('.box,.w,.d').forEach(box => box.style.opacity = 0.25);
            }

            

        }, 'active');
    });

    
    const scalingMenu = document.getElementById("scaling_menu");
    const modeMenu = document.getElementById("mode_menu");
    const metricMenu = document.getElementById("metric_menu");


    // Function for both button A and B
    function clickRerender(event) {
        let nextColor;
        if (document.getElementById('relative').className==='active'){
            const visibleFeatures = map.queryRenderedFeatures({ layers: ['lsoa','msoa','msoa_simple'] });
            if (visibleFeatures.length === 0) return;

            const values = visibleFeatures.map(f => f.properties[`${globalMetric}_${globalMode}_180_rk`]);
            vmin = d3.quantile(values,.01);
            vmax = d3.quantile(values,.99);
            if (vmin === vmax) vmax += .01;
            colorPals = reColor(vmin,vmax)
        }
        if (globalMetric === 'div_wea_col'){nextColor=['rgb',['get', `div_wea_col_${globalMode}_180_r`],['get', `div_wea_col_${globalMode}_180_g`],['get', `div_wea_col_${globalMode}_180_b`]]}
        else if(globalMetric === 'none'){nextColor='transparent'}
        else{nextColor = ['interpolate-hcl', ['linear'], ['get', `${globalMetric}_${globalMode}_180_rk`], ...colorPals[globalMetric]]};
        const scales = ['lsoa','msoa','msoa_simple'];
        scales.forEach(scale => {
            map.setPaintProperty(`${scale}`, 'fill-color', nextColor);
        });
    }

    // Attach event listeners
    modeMenu.addEventListener("click", clickRerender);
    scalingMenu.addEventListener("click", clickRerender);
    metricMenu.addEventListener("click", clickRerender);

});

