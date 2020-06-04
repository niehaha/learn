const hosts = [
    'https://traffic.map.xiaojukeji.com',
    'https://traffic1.map.xiaojukeji.com',
    'https://traffic2.map.xiaojukeji.com',
    'https://traffic3.map.xiaojukeji.com',
    'https://traffic4.map.xiaojukeji.com',
    'https://traffic5.map.xiaojukeji.com',
    'https://traffic6.map.xiaojukeji.com',
    'https://traffic7.map.xiaojukeji.com',
    'https://traffic8.map.xiaojukeji.com',
]
function getPbfPaths(name: string) {
    if (name === 'traffic_tile') {
        return hosts.map(
            host => `${host}/diyurender?op=pbf_ex_tile&x={x}&y={y}&z={z}&userid=vue-mapbox-gl&t=${Date.now()}`
        )
    }
    return hosts.map(host => `${host}/data/${name}/{z}/{x}/{y}.pbf`)
}
const baseStyle = {
    version: 8,
    transition: {
        duration: 1000,
        delay: 0,
    },
    sources: {
        road_tile: {
            type: 'vector',
            tiles: getPbfPaths('road_tile'),
            maxzoom: 14,
            minzoom: 5,
        },
        rail_tile: {
            type: 'vector',
            tiles: getPbfPaths('rail_tile'),
            maxzoom: 14,
            minzoom: 6,
        },
        point_tile: {
            type: 'vector',
            tiles: getPbfPaths('point_tile'),
            maxzoom: 14,
            minzoom: 13,
        },
        polygon_tile: {
            type: 'vector',
            tiles: getPbfPaths('polygon_tile'),
            maxzoom: 14,
            minzoom: 3,
        },
        city_tile: {
            type: 'vector',
            tiles: getPbfPaths('city_tile'),
            maxzoom: 11,
            minzoom: 3,
        },
        adminline: {
            type: 'vector',
            tiles: getPbfPaths('admin_line'),
            maxzoom: 10,
            minzoom: 3,
        },
        waterface: {
            type: 'vector',
            tiles: getPbfPaths('water_face'),
            maxzoom: 11,
            minzoom: 5,
        },
        worldwater: {
            type: 'vector',
            tiles: getPbfPaths('world_water'),
            maxzoom: 5,
            minzoom: 3,
        },
        traffic_tile: {
            type: 'vector',
            tiles: getPbfPaths('traffic_tile'),
            maxzoom: 16,
            minzoom: 6,
        },
    },
    sprite: hosts[0] + '/styles/darkblue/sprite',
    glyphs: hosts[0] + '/fonts/{fontstack}/{range}.pbf',
    layers: [
        {
            id: 'background',
            type: 'background',
            paint: {
                'background-color': {
                    stops: [[11, 'hsl(35, 32%, 91%)'], [13, 'hsl(35, 12%, 89%)']],
                },
            },
        },
        {
            id: 'worldwater',
            maxzoom: 5.0,
            source: 'worldwater',
            layout: {
                visibility: 'visible',
            },
            paint: {
                'fill-color': 'hsl(196, 80%, 70%)',
            },
            'source-layer': 'Worldwaterface',
            minzoom: 3,
            type: 'fill',
        },
        {
            id: 'waterface',
            type: 'fill',
            source: 'waterface',
            filter: ['all', ['==', 'kind', 1]],
            layout: {
                visibility: 'visible',
            },
            paint: {
                'fill-color': 'hsl(196, 80%, 70%)',
            },
            'source-layer': 'Waterface',
            minzoom: 5,
            maxzoom: 18,
        },
        {
            id: 'manmade',
            type: 'fill',
            source: 'polygon_tile',
            'source-layer': 'polygon',
            filter: ['all', ['in', 'Type', 'ManMade']],
            paint: {
                'fill-color': 'hsl(50, 47%, 81%)',
            },
        },
        {
            id: 'greenland',
            type: 'fill',
            source: 'polygon_tile',
            'source-layer': 'polygon',
            filter: ['all', ['in', 'Type', 'GreenLand']],
            paint: {
                'fill-color': 'hsl(100, 58%, 76%)',
            },
        },
        {
            id: 'water',
            type: 'fill',
            source: 'polygon_tile',
            'source-layer': 'polygon',
            filter: ['all', ['in', 'Type', 'Water']],
            paint: {
                'fill-color': 'hsl(196, 80%, 70%)',
            },
        },
        {
            id: 'railway',
            type: 'line',
            source: 'rail_tile',
            'source-layer': 'rail',
            filter: ['all', ['in', 'Type', 'RailWay']],
            layout: {
                'line-join': 'round',
                visibility: 'visible',
                'line-cap': 'round',
            },
            paint: {
                'line-color': '#a8a6a4',
                'line-width': {
                    stops: [[6, 1.5], [20, 10]],
                    base: 1.2,
                },
            },
        },
        {
            id: 'railway_dash',
            type: 'line',
            source: 'rail_tile',
            'source-layer': 'rail',
            filter: ['all', ['in', 'Type', 'RailWay']],
            layout: {
                'line-join': 'round',
                visibility: 'visible',
                'line-cap': 'round',
            },
            paint: {
                'line-dasharray': [8, 8],
                'line-color': '#ffffff',
                'line-width': {
                    stops: [[6, 0.5], [20, 8]],
                    base: 1.2,
                },
            },
        },
        {
            id: 'linkway-case',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'LinkWay']],
            paint: {
                'line-color': 'hsl(230, 24%, 87%)',
                'line-width': {
                    base: 1.5,
                    stops: [[10, 1], [18, 2]],
                },
                'line-gap-width': {
                    base: 1.5,
                    stops: [[12, 0.75], [18, 10]],
                },
                'line-opacity': {
                    base: 1,
                    stops: [[11.99, 0], [12, 0.5], [13, 1]],
                },
            },
        },
        {
            id: 'linkway',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'LinkWay']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'hsl(0, 0%, 100%)',
                'line-width': {
                    base: 1.5,
                    stops: [[10, 0.75], [18, 10]],
                },
            },
        },
        {
            id: 'nineway',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'NineWay', 'FerryService', 'FootWay', 'Other']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'hsl(0, 0%, 100%)',
                'line-width': {
                    base: 1.5,
                    stops: [[12, 0.5], [18, 6]],
                },
            },
            'line-opacity': {
                base: 1,
                stops: [[13, 0.3], [16, 1]],
            },
        },
        {
            id: 'ruralway-case',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'RuralWay']],
            paint: {
                'line-color': 'hsl(230, 24%, 87%)',
                'line-width': {
                    base: 1.5,
                    stops: [[10, 1], [18, 2]],
                },
                'line-gap-width': {
                    base: 1.5,
                    stops: [[10, 1], [18, 16]],
                },
                'line-opacity': {
                    base: 1,
                    stops: [[11.99, 0], [13, 1]],
                },
            },
        },
        {
            id: 'ruralway',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'RuralWay']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'hsl(0, 0%, 100%)',
                'line-width': {
                    base: 1.5,
                    stops: [[10, 1], [18, 16]],
                },
                'line-opacity': {
                    base: 1,
                    stops: [[10, 0.1], [13, 1]],
                },
            },
        },
        {
            id: 'provinceway-case',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'ProvinceWay', 'CountyWay']],
            paint: {
                'line-color': 'hsl(230, 24%, 87%)',
                'line-width': {
                    base: 1.5,
                    stops: [[10, 1], [18, 2]],
                },
                'line-gap-width': {
                    base: 1.5,
                    stops: [[10, 0.75], [18, 25]],
                },
                'line-opacity': {
                    base: 1,
                    stops: [[9.99, 0], [10, 1]],
                },
            },
        },
        {
            id: 'provinceway',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'ProvinceWay', 'CountyWay']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': {
                    base: 1,
                    stops: [[5, 'hsl(35, 32%, 91%)'], [7, 'hsl(0, 0%, 100%)']],
                },
                'line-width': {
                    base: 1.5,
                    stops: [[8, 0.75], [18, 25]],
                },
                'line-opacity': {
                    base: 1,
                    stops: [[9, 0.5], [11, 1]],
                },
            },
        },
        {
            id: 'cityheighway-case',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'CityHighway', 'StateWay']],
            paint: {
                'line-color': 'hsl(0, 0%, 100%)',
                'line-width': {
                    base: 1.5,
                    stops: [[5, 1], [18, 2]],
                },
                'line-gap-width': {
                    base: 1.5,
                    stops: [[5, 0.75], [18, 32]],
                },
            },
        },
        {
            id: 'cityheighway',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'CityHighway', 'StateWay']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'hsl(46, 85%, 67%)',
                'line-width': {
                    base: 1.5,
                    stops: [[5, 0.75], [18, 32]],
                },
            },
        },
        {
            id: 'heighway-case',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'HighWay']],
            paint: {
                'line-color': 'hsl(0, 0%, 100%)',
                'line-width': {
                    base: 1.5,
                    stops: [[10, 1], [18, 2]],
                },
                'line-gap-width': {
                    base: 1.5,
                    stops: [[5, 0.75], [18, 35]],
                },
            },
        },
        {
            id: 'heighway',
            type: 'line',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['in', 'Type', 'HighWay']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'hsl(26, 100%, 68%)',
                'line-width': {
                    base: 1.5,
                    stops: [[5, 0.75], [18, 35]],
                },
            },
        },
        {
            id: 'provinceline',
            type: 'line',
            source: 'adminline',
            filter: ['all', ['==', 'kind', 5]],
            layout: {
                'line-join': 'round',
                visibility: 'visible',
                'line-cap': 'round',
            },
            paint: {
                'line-dasharray': [5, 3],
                'line-opacity': 1.0,
                'line-color': '#cecece',
                'line-width': 1.0,
            },
            'source-layer': 'Adminbound',
            minzoom: 3,
            maxzoom: 10,
        },
        {
            id: 'countryline',
            type: 'line',
            source: 'adminline',
            filter: ['all', ['in', 'kind', 3, 2, 1]],
            layout: {
                'line-join': 'round',
                visibility: 'visible',
                'line-cap': 'round',
            },
            paint: {
                'line-dasharray': [3, 3, 5, 5],
                'line-color': '#e69b25',
                'line-width': {
                    stops: [[3, 1], [8, 2]],
                    base: 1.2,
                },
            },
            'source-layer': 'Adminbound',
            minzoom: 3,
            maxzoom: 12,
        },
        {
            id: 'road_label',
            type: 'symbol',
            source: 'road_tile',
            'source-layer': 'road',
            filter: ['all', ['!=', 'Name', 'None']],
            layout: {
                'text-size': 13,
                'text-padding': 30,
                //"text-font": ["Open Sans Regular","Arial Unicode MS Regular"],
                'text-font': ['Arial Unicode MS Regular'],
                'symbol-placement': 'line',
                'text-field': '{Name}',
            },
            paint: {
                'text-color': '#252121',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
            minzoom: 10,
            maxzoom: 20,
        },
        {
            id: 'point_greenland',
            type: 'symbol',
            source: 'point_tile',
            filter: ['all', ['==', 'Type', 'GreenLand']],
            'source-layer': 'point',
            layout: {
                'icon-image': 'poi_code_130201_16',
                'icon-padding': 30,
                'text-field': '{Name}',
                'text-size': 13,
                'text-padding': 30,
                //"text-font": ["Open Sans Regular","Arial Unicode MS Regular"],
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'text-color': '#557e43',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
        },
        {
            id: 'point_water',
            type: 'symbol',
            source: 'point_tile',
            filter: ['all', ['==', 'Type', 'Water']],
            'source-layer': 'point',
            layout: {
                'text-field': '{Name}',
                'text-size': 13,
                'text-padding': 30,
                //"text-font": ["Open Sans Regular","Arial Unicode MS Regular"],
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'text-color': '#6fa8dc',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
        },
        {
            id: 'point_mammade',
            type: 'symbol',
            source: 'point_tile',
            filter: ['all', ['==', 'Type', 'ManMade']],
            'source-layer': 'point',
            layout: {
                'icon-image': 'space-type-30-18',
                'icon-padding': 30,
                'text-field': '{Name}',
                'text-size': 13,
                'text-padding': 30,
                //"text-font": ["Open Sans Regular","Arial Unicode MS Regular"],
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'text-color': '#5a7d87',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
        },
        {
            id: 'district',
            type: 'symbol',
            source: 'city_tile',
            filter: ['all', ['==', 'Type', 'District']],
            'source-layer': 'city',
            layout: {
                'text-field': '{Name}',
                'text-size': {
                    base: 1.5,
                    stops: [[8, 12], [11, 17]],
                },
                'text-padding': 5,
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'text-color': {
                    base: 15,
                    stops: [[7, '#5a7d87'], [9.99, '#5a7d87'], [10, '#ffffff']],
                },
                'text-halo-color': {
                    base: 15,
                    stops: [[7, '#ffffff'], [9.99, '#ffffff'], [10, '#8fb9df']],
                },
                'text-halo-width': {
                    base: 15,
                    stops: [[7, 0.8], [9.99, 0.8], [10, 13]],
                },
            },
            minzoom: 8,
            maxzoom: 11,
        },
        {
            id: 'nomalcity',
            type: 'symbol',
            source: 'city_tile',
            filter: ['all', ['==', 'Type', 'NormalCity']],
            'source-layer': 'city',
            layout: {
                // 'icon-image': 'circle-red-11',
                'icon-padding': 0,
                'text-field': '{Name}',
                'text-size': 16,
                'text-padding': 20,
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'text-color': '#425372',
                'text-halo-color': '#ffffff',
                'text-halo-width': 0.8,
            },
            minzoom: 5,
            maxzoom: 9,
        },
        {
            id: 'pcapital',
            type: 'symbol',
            source: 'city_tile',
            filter: ['all', ['==', 'Type', 'PCapital']],
            'source-layer': 'city',
            layout: {
                // 'icon-image': 'point-11',
                'icon-padding': 0,
                'text-field': '{Name}',
                'text-size': 18,
                'text-padding': 0,
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'text-color': '#161515',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
            minzoom: 4,
            maxzoom: 9,
        },
        {
            id: 'capital',
            type: 'symbol',
            source: 'city_tile',
            filter: ['all', ['==', 'Type', 'Capital']],
            'source-layer': 'city',
            layout: {
                // 'icon-image': 'poi_code_120102_16',
                'icon-padding': 0,
                'text-field': '{Name}',
                'text-size': 18,
                'text-padding': 0,
                //"text-font": ["Open Sans Regular","Arial Unicode MS Regular"],
                'text-font': ['Arial Unicode MS Regular'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top',
            },
            paint: {
                'icon-color': '#5a7d87',
                'text-color': '#161515',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
            },
            minzoom: 3,
            maxzoom: 9,
        },
    ]
}

export default baseStyle