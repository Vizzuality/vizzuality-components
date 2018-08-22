export const layers = [
  {
    id: 'e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7',
    type: 'layer',
    name: 'Political Boundaries (First Subnational Level)',
    slug: 'political-boundaries-gadm',
    dataset: '098b33df-6871-4e53-a5ff-b56a7d989f9a',
    description: 'First-level subnational political boundaries are the largest administrative subdivisions in a country.',
    application: [
      'rw'
    ],
    iso: [
      'global'
    ],
    provider: 'cartodb',
    userId: '58333dcfd9f39b189ca44c75',
    default: true,
    protected: false,
    published: true,
    env: 'production',
    layerConfig: {
      body: {
        layers: [
          {
            options: {
              cartocss_version: '2.3.0',
              cartocss: '#gadm28_adm1{  polygon-fill: #3bb2d0;  polygon-opacity: 0;  line-color: #5CA2D1;  line-width: 0.5;  line-opacity: 1;}',
              sql: 'SELECT * FROM gadm28_adm1'
            },
            type: 'cartodb'
          }
        ],
        minzoom: 3,
        maxzoom: 18
      },
      account: 'wri-01'
    },
    legendConfig: {
      type: 'basic',
      items: [
        {
          name: 'Subnational Political Boundaries',
          color: '#5CA2D1'
        }
      ]
    },
    interactionConfig: {
      output: [
        {
          column: 'name_1',
          format: null,
          prefix: '',
          property: 'Name',
          suffix: '',
          type: 'string'
        },
        {
          column: 'type_1',
          format: null,
          prefix: '',
          property: 'Type',
          suffix: '',
          type: 'string'
        }
      ]
    },
    applicationConfig: {},
    staticImageConfig: {},
    updatedAt: '2018-04-06T14:15:37.360Z'
  },
  {
    "id": "e9f9d20c-1924-48b2-97ed-6936e233adb2",
    "name": "Vegetation Health Index (Latest Week)",
    "slug": "Vegetation-Health-Index-Most-Recent",
    "dataset": "4828c405-06a2-4460-a78c-90969bce582b",
    "description": "VHI of the latest available week. It is is a proxy that is used to estimate crop condition if the indices are below 40 indicating different level of vegetation stress, losses of crop and pasture production might be expected; if the indices above 60 (favorable condition) plentiful production might be expected.",
    "application": [
      "rw"
    ],
    "iso": [],
    "provider": "gee",
    "userId": "57d021e329309063404573a8",
    "default": true,
    "protected": false,
    "published": true,
    "env": "production",
    "layerConfig": {
      "body": {
        "sldValue": "<RasterSymbolizer><ColorMap type=\"ramp\" extended=\"false\" ><ColorMapEntry color=\"#FDE724\" quantity=\"0\" label=\"\" opacity=\"0\" /><ColorMapEntry color=\"#FDE724\" quantity=\"20\" label=\"\" opacity=\"1\" /><ColorMapEntry color=\"#8DD644\" quantity=\"40\" label=\"\" /><ColorMapEntry color=\"#35B778\" quantity=\"60\" label=\"\" /><ColorMapEntry color=\"#208F8C\" quantity=\"80\" label=\"\" /><ColorMapEntry color=\"#30678D\" quantity=\"100\" label=\"\" /></ColorMap></RasterSymbolizer>",
        "styleType": "sld"
      },
      "assetId": "users/resourcewatch_wri/foo_024_vegetation_health_index",
      "isImageCollection": true,
      "position": "last",
      "type": "tileLayer"
    },
    "legendConfig": {
      "items": [
        {
          "color": "#FDE724",
          "name": "0-20"
        },
        {
          "color": "#8DD644",
          "name": "20-40"
        },
        {
          "color": "#35B778",
          "name": "40-60"
        },
        {
          "color": "#208F8C",
          "name": "60-80"
        },
        {
          "color": "#30678D",
          "name": "80-100"
        }
      ],
      "type": "choropleth"
    },
    "interactionConfig": {
      "type": "intersection",
      "config": {
        "url": "https://staging-api.globalforestwatch.org/v1/query/b5458f7f-b5e6-4b29-8524-5040e4bf5a27?sql=select first(b1) as x from 'users/resourcewatch_wri/foo_024_vegetation_health_index' where system:time_start >= 1532822500000 and ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{\"type\":\"Point\",\"coordinates\":[{{lng}},{{lat}}]}'),4326), the_geom)"        
        // "url": "https://api.resourcewatch.org/v1/query/4828c405-06a2-4460-a78c-90969bce582b?sql=select first(b1) as x from 'users/resourcewatch_wri/foo_024_vegetation_health_index' where system:time_start >= 1533448800000 and ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{\"type\":\"Point\",\"coordinates\":[{{lng}},{{lat}}}}]}'),4326), the_geom)"
      },
      "pulseConfig": {
        "url": "https://api.resourcewatch.org/v1/query/4828c405-06a2-4460-a78c-90969bce582b?sql=select first(b1) as x from 'users/resourcewatch_wri/foo_024_vegetation_health_index' where system:time_start >= 1533448800000 and st_intersects(the_geom,st_buffer(ST_SetSRID(st_geomfromgeojson('{\"type\":\"Point\",\"coordinates\":{{point}}}'),4326),1))"
      },
      "output": [
        {
          "column": "x",
          "property": "HVI value",
          "type": "number",
          "format": "0.00"
        }
      ]
    },
    "applicationConfig": {},
    "staticImageConfig": {},
    "updatedAt": "2018-08-16T13:44:52.926Z"
  }  
];


export const sideBySideLayers = [
  {
    "id": "70e900f1-2c37-470d-9367-7b34567e3084",
    "type": "layer",
    "name": "Biodiversity Intactness (%)",
    "slug": "Biodiversity-Intactness",
    "dataset": "0e565ddf-74fd-4f90-a6b8-c89d747a89ab",
    "description": "Modeled average abundance of originally present species, relative to their abundance in an intact ecosystem.",
    "application": [
      "rw"
    ],
    "iso": [],
    "provider": "gee",
    "userId": "58f63c81bd32c60206ed6b12",
    "default": true,
    "protected": false,
    "published": true,
    "env": "production",
    "layerConfig": {
      "type": "gee",
      "assetId": "users/resourcewatch/bio_014_bio_intactness",
      "body": {
        "styleType": "sld",
        "sldValue": "<RasterSymbolizer><ColorMap type=\"ramp\" extended=\"false\" ><ColorMapEntry color=\"#ffffcc\" quantity=\"0.6\"  opacity=\"1\" /><ColorMapEntry color=\"#c2e699\" quantity=\"0.7\" /><ColorMapEntry color=\"#78c679\" quantity=\"0.8\" /><ColorMapEntry color=\"#31a354\" quantity=\"0.9\"  /><ColorMapEntry color=\"#006837\" quantity=\"1.0\"  /></ColorMap></RasterSymbolizer>"
      }
    },
    "legendConfig": {
      "type": "choropleth",
      "items": [
        {
          "name": "≤60",
          "color": "#ffffcc"
        },
        {
          "name": "≤70",
          "color": "#c2e699"
        },
        {
          "name": "≤80",
          "color": "#78c679"
        },
        {
          "name": "≤90",
          "color": "#31a354"
        },
        {
          "name": "≤100",
          "color": "#006837"
        }
      ]
    },
    "interactionConfig": {
      "output": []
    },
    "applicationConfig": {},
    "staticImageConfig": {},
    "updatedAt": "2018-04-07T20:04:33.019Z"
  },
  {
    "id": "e9f9d20c-1924-48b2-97ed-6936e233adb2",
    "name": "Vegetation Health Index (Latest Week)",
    "slug": "Vegetation-Health-Index-Most-Recent",
    "dataset": "4828c405-06a2-4460-a78c-90969bce582b",
    "description": "VHI of the latest available week. It is is a proxy that is used to estimate crop condition if the indices are below 40 indicating different level of vegetation stress, losses of crop and pasture production might be expected; if the indices above 60 (favorable condition) plentiful production might be expected.",
    "application": [
      "rw"
    ],
    "iso": [],
    "provider": "gee",
    "userId": "57d021e329309063404573a8",
    "default": true,
    "protected": false,
    "published": true,
    "env": "production",
    "layerConfig": {
      "body": {
        "sldValue": "<RasterSymbolizer><ColorMap type=\"ramp\" extended=\"false\" ><ColorMapEntry color=\"#FDE724\" quantity=\"0\" label=\"\" opacity=\"0\" /><ColorMapEntry color=\"#FDE724\" quantity=\"20\" label=\"\" opacity=\"1\" /><ColorMapEntry color=\"#8DD644\" quantity=\"40\" label=\"\" /><ColorMapEntry color=\"#35B778\" quantity=\"60\" label=\"\" /><ColorMapEntry color=\"#208F8C\" quantity=\"80\" label=\"\" /><ColorMapEntry color=\"#30678D\" quantity=\"100\" label=\"\" /></ColorMap></RasterSymbolizer>",
        "styleType": "sld"
      },
      "assetId": "users/resourcewatch_wri/foo_024_vegetation_health_index",
      "isImageCollection": true,
      "position": "last",
      "type": "tileLayer"
    },
    "legendConfig": {
      "items": [
        {
          "color": "#FDE724",
          "name": "0-20"
        },
        {
          "color": "#8DD644",
          "name": "20-40"
        },
        {
          "color": "#35B778",
          "name": "40-60"
        },
        {
          "color": "#208F8C",
          "name": "60-80"
        },
        {
          "color": "#30678D",
          "name": "80-100"
        }
      ],
      "type": "choropleth"
    },
    "interactionConfig": {
      "type": "intersection",
      "config": {
        "url": "https://staging-api.globalforestwatch.org/v1/query/b5458f7f-b5e6-4b29-8524-5040e4bf5a27?sql=select first(b1) as x from 'users/resourcewatch_wri/foo_024_vegetation_health_index' where system:time_start >= 1532822500000 and ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{\"type\":\"Point\",\"coordinates\":[{{lng}},{{lat}}]}'),4326), the_geom)"
        // "url": "https://api.resourcewatch.org/v1/query/4828c405-06a2-4460-a78c-90969bce582b?sql=select first(b1) as x from 'users/resourcewatch_wri/foo_024_vegetation_health_index' where system:time_start >= 1533448800000 and ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{\"type\":\"Point\",\"coordinates\":[{{lng}},{{lat}}}}]}'),4326), the_geom)"
      },
      "pulseConfig": {
        "url": "https://api.resourcewatch.org/v1/query/4828c405-06a2-4460-a78c-90969bce582b?sql=select first(b1) as x from 'users/resourcewatch_wri/foo_024_vegetation_health_index' where system:time_start >= 1533448800000 and st_intersects(the_geom,st_buffer(ST_SetSRID(st_geomfromgeojson('{\"type\":\"Point\",\"coordinates\":{{point}}}'),4326),1))"
      },
      "output": [
        {
          "column": "x",
          "property": "HVI value",
          "type": "number",
          "format": "0.00"
        }
      ]
    },
    "applicationConfig": {},
    "staticImageConfig": {},
    "updatedAt": "2018-08-16T13:44:52.926Z"
  }
];

export default {
  layers, sideBySideLayers
}