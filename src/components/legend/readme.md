### Full legend

```jsx
const LegendItemToolbar = require('./legend-list/legend-item/legend-item-toolbar').default;
const LegendItemButtonLayers = require('./legend-list/legend-item/legend-item-toolbar').LegendItemButtonLayers;
const LegendItemButtonOpacity = require('./legend-list/legend-item/legend-item-toolbar').LegendItemButtonOpacity;
const LegendItemButtonVisibility = require('./legend-list/legend-item/legend-item-toolbar').LegendItemButtonVisibility;
const LegendItemButtonInfo = require('./legend-list/legend-item/legend-item-toolbar').LegendItemButtonInfo;
const LegendItemButtonRemove = require('./legend-list/legend-item/legend-item-toolbar').LegendItemButtonRemove;

<Legend
  LegendItemToolbar={
    <LegendItemToolbar>
      <LegendItemButtonLayers />
      <LegendItemButtonOpacity />
      <LegendItemButtonVisibility />
      <LegendItemButtonInfo />
      <LegendItemButtonRemove />
    </LegendItemToolbar>
  }
  layerGroups={
    [
      {
        "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
        "visible": true,
        "layers": [
          {
            "id": "2a694289-fec9-4bfe-a6d2-56c3864ec349",
            "active": true,
            "name": "Capacity (MW) and Fuel Type",
            "slug": "Capacity-MW",
            "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
            "description": "",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "5980838ae24e6a1dae3dd446",
            "default": true,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "body": {
                "layers": [
                  {
                    "options": {
                      "cartocss_version": "2.3.0",
                      "cartocss": "#powerwatch_data_20180102 { marker-line-width:0.3; marker-line-color:#FFF; marker-allow-overlap: true; marker-line-opacity:0;}[capacity_mw <= 1500] {marker-fill-opacity: 0.6;}[capacity_mw > 1500] {marker-fill-opacity: 0.8;} [capacity_mw > 1500]{marker-width: 12.0+8.0*[capacity_mw]/22500.0;} [capacity_mw <= 1500]{marker-width: 4.0+8.0*[capacity_mw]/1500.0;} [fuel1='Coal']{marker-fill:#000000;}[fuel1='Oil']{marker-fill:#B15928;}[fuel1='Gas']{marker-fill:#BC80BD;}[fuel1='Hydro']{marker-fill:#1F78B4;}[fuel1='Nuclear']{marker-fill:#E31A1C;}[fuel1='Solar']{marker-fill:#FF7F00;}[fuel1='Waste']{marker-fill:#6A3D9A;}[fuel1='Wind']{marker-fill:#5CA2D1;}[fuel1='Geothermal']{marker-fill:#FDBF6F;}[fuel1='Biomass']{marker-fill:#229A00;}[fuel1='Others']{marker-fill:#B2DF8A;} [capacity_mw>=9000]{marker-width:10;}",
                      "sql": "SELECT * FROM powerwatch_data_20180102"
                    },
                    "type": "mapnik"
                  }
                ],
                "minzoom": 3,
                "maxzoom": 18
              },
              "account": "wri-rw"
            },
            "legendConfig": {
              "items": [
                {
                  "color": "#000000",
                  "name": "Coal"
                },
                {
                  "color": "#B15928",
                  "name": "Oil"
                },
                {
                  "color": "#BC80BD",
                  "name": "Gas"
                },
                {
                  "color": "#1F78B4",
                  "name": "Hydro"
                },
                {
                  "color": "#E31A1C",
                  "name": "Nuclear"
                },
                {
                  "color": "#FF7F00",
                  "name": "Solar"
                },
                {
                  "color": "#6A3D9A",
                  "name": "Waste"
                },
                {
                  "color": "#5CA2D1",
                  "name": "Wind"
                },
                {
                  "color": "#FDBF6F",
                  "name": "Geothermal"
                },
                {
                  "color": "#229A00",
                  "name": "Biomass"
                },
                {
                  "color": "#B2DF8A",
                  "name": "Others"
                }
              ],
              "type": "basic"
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-01-02T20:48:34.623Z",
            "order": 2
          },
          {
            "id": "155968b5-7c59-4065-9e3a-0a81d52d50de",
            "active": false,
            "name": "Fuel Type",
            "slug": "Fuel-Type",
            "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
            "description": "",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "5980838ae24e6a1dae3dd446",
            "default": false,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "wri-rw",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM powerwatch_data_20180102",
                      "cartocss": "#powerwatch_data_20180102 {marker-fill-opacity:1; marker-width:3; marker-line-width:0.3; marker-line-color:#FFF; marker-allow-overlap: true; marker-line-opacity:0;} [fuel1='Coal']{marker-fill:#000000;}[fuel1='Oil']{marker-fill:#B15928;}[fuel1='Gas']{marker-fill:#BC80BD;}[fuel1='Hydro']{marker-fill:#1F78B4;}[fuel1='Nuclear']{marker-fill:#E31A1C;}[fuel1='Solar']{marker-fill:#FF7F00;}[fuel1='Waste']{marker-fill:#6A3D9A;}[fuel1='Wind']{marker-fill:#5CA2D1;}[fuel1='Geothermal']{marker-fill:#FDBF6F;}[fuel1='Biomass']{marker-fill:#229A00;}[fuel1='Others']{marker-fill:#B2DF8A;}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "items": [
                {
                  "color": "#000000",
                  "name": "Coal"
                },
                {
                  "color": "#B15928",
                  "name": "Oil"
                },
                {
                  "color": "#BC80BD",
                  "name": "Gas"
                },
                {
                  "color": "#1F78B4",
                  "name": "Hydro"
                },
                {
                  "color": "#E31A1C",
                  "name": "Nuclear"
                },
                {
                  "color": "#FF7F00",
                  "name": "Solar"
                },
                {
                  "color": "#6A3D9A",
                  "name": "Waste"
                },
                {
                  "color": "#5CA2D1",
                  "name": "Wind"
                },
                {
                  "color": "#FDBF6F",
                  "name": "Geothermal"
                },
                {
                  "color": "#229A00",
                  "name": "Biomass"
                },
                {
                  "color": "#B2DF8A",
                  "name": "Others"
                }
              ],
              "type": "basic"
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-01-02T19:24:16.541Z",
            "order": 2
          },
          {
            "id": "5868a183-0f99-4c6d-93d1-8ddb7b4f2784",
            "active": false,
            "name": "Power Plant Capacity (MW)",
            "slug": "Capacity-MW_1",
            "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
            "description": "",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "5980838ae24e6a1dae3dd446",
            "default": false,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "wri-rw",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM powerwatch_data_20180102 ORDER BY capacity_mw ASC",
                      "cartocss": "#powerwatch_data_20180102 {marker-fill:#0099CC; marker-line-width:0.3; marker-line-color:#FFF; marker-allow-overlap: true; marker-line-opacity:0;} [capacity_mw <= 1500] {marker-fill-opacity: 0.6;}[capacity_mw > 1500] {marker-fill-opacity: 0.8;} [capacity_mw > 1500]{marker-width: 12.0+8.0*[capacity_mw]/22500.0;} [capacity_mw <= 1500]{marker-width: 4.0+8.0*[capacity_mw]/1500.0;}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "type": "basic",
              "items": [
                {
                  "name": "Capacity (1MW-22,500MW)",
                  "color": "#0099CC"
                }
              ]
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-01-02T20:46:54.806Z",
            "order": 2
          }
        ]
      },
      {
        "dataset": "a0aecb8d-07ee-42e6-be3d-e5cabf12b0a9",
        "visible": false,
        "layers": [
          {
            "id": "40dff26a-1f11-4c35-b261-e0c432b4ee77",
            "active": true,
            "name": "2014-2018 Number of Migrant Deaths",
            "slug": "2014-2017-Number-of-Migrant-Deaths",
            "dataset": "a0aecb8d-07ee-42e6-be3d-e5cabf12b0a9",
            "description": "Deaths along migratory routes worldwide from 2014 to the present.",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "58f63c81bd32c60206ed6b12",
            "default": false,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "rw-nrt",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM soc_018_missing_migrants",
                      "cartocss": "#layer{ marker-fill: ramp([number_dead], (#fcde9c, #f58670, #e34f6f, #d72d7c), jenks); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 0; marker-line-opacity: 1; [number_dead=null]{ marker-fill: #ababab;} [zoom < 4]{marker-width: 8;}  [zoom > 3]{marker-width: 12;}  [zoom > 6]{marker-width: 14;}  [zoom > 9]{marker-width: 16;}}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "type": "choropleth",
              "items": [
                {
                  "name": "<5",
                  "color": "#fcde9c"
                },
                {
                  "name": "<20",
                  "color": "#f58670"
                },
                {
                  "name": "<50",
                  "color": "#e34f6f"
                },
                {
                  "name": "<205",
                  "color": "#d72d7c"
                },
                {
                  "name": "No Data",
                  "color": "#ababab"
                }
              ]
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-02-22T17:51:15.218Z",
            "order": 1
          },
          {
            "id": "0c094e37-4563-4633-9a38-28dd4a4724bf",
            "active": false,
            "name": "Migrant Deaths (past 30 days)",
            "slug": "Migrant-Deaths-past-30-days",
            "dataset": "a0aecb8d-07ee-42e6-be3d-e5cabf12b0a9",
            "description": "Migrant deaths reported in the past 30 days.",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "58f63c81bd32c60206ed6b12",
            "default": true,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "rw-nrt",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM soc_018_missing_migrants where (reported_date > current_date - interval '30 day')",
                      "cartocss": "#layer{ marker-fill: ramp([number_dead], (#fcde9c, #f58670, #e34f6f, #d72d7c), jenks); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 0; marker-line-opacity: 1; [number_dead=null]{ marker-fill: #ababab;} [zoom < 4]{marker-width: 8;}  [zoom > 3]{marker-width: 12;}  [zoom > 6]{marker-width: 14;}  [zoom > 9]{marker-width: 16;}}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "type": "choropleth",
              "items": [
                {
                  "name": "<5",
                  "color": "#fcde9c"
                },
                {
                  "name": "<20",
                  "color": "#f58670"
                },
                {
                  "name": "<50",
                  "color": "#e34f6f"
                },
                {
                  "name": "<205",
                  "color": "#d72d7c"
                },
                {
                  "name": "No Data",
                  "color": "#ababab"
                }
              ]
            },
            "interactionConfig": {
              "output": [
                {
                  "column": "number_dead",
                  "format": "00000",
                  "prefix": "",
                  "property": "Number Dead",
                  "suffix": "",
                  "type": "number"
                }
              ]
            },
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-02-27T17:30:08.964Z",
            "order": 1
          }
        ]
      }
    ]       
  }
/>
```


### Not draggable legend
```jsx
<Legend
  sortable={false}
  layerGroups={
    [
      {
        "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
        "visible": true,
        "layers": [
          {
            "id": "2a694289-fec9-4bfe-a6d2-56c3864ec349",
            "active": true,
            "name": "Capacity (MW) and Fuel Type",
            "slug": "Capacity-MW",
            "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
            "description": "",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "5980838ae24e6a1dae3dd446",
            "default": true,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "body": {
                "layers": [
                  {
                    "options": {
                      "cartocss_version": "2.3.0",
                      "cartocss": "#powerwatch_data_20180102 { marker-line-width:0.3; marker-line-color:#FFF; marker-allow-overlap: true; marker-line-opacity:0;}[capacity_mw <= 1500] {marker-fill-opacity: 0.6;}[capacity_mw > 1500] {marker-fill-opacity: 0.8;} [capacity_mw > 1500]{marker-width: 12.0+8.0*[capacity_mw]/22500.0;} [capacity_mw <= 1500]{marker-width: 4.0+8.0*[capacity_mw]/1500.0;} [fuel1='Coal']{marker-fill:#000000;}[fuel1='Oil']{marker-fill:#B15928;}[fuel1='Gas']{marker-fill:#BC80BD;}[fuel1='Hydro']{marker-fill:#1F78B4;}[fuel1='Nuclear']{marker-fill:#E31A1C;}[fuel1='Solar']{marker-fill:#FF7F00;}[fuel1='Waste']{marker-fill:#6A3D9A;}[fuel1='Wind']{marker-fill:#5CA2D1;}[fuel1='Geothermal']{marker-fill:#FDBF6F;}[fuel1='Biomass']{marker-fill:#229A00;}[fuel1='Others']{marker-fill:#B2DF8A;} [capacity_mw>=9000]{marker-width:10;}",
                      "sql": "SELECT * FROM powerwatch_data_20180102"
                    },
                    "type": "mapnik"
                  }
                ],
                "minzoom": 3,
                "maxzoom": 18
              },
              "account": "wri-rw"
            },
            "legendConfig": {
              "items": [
                {
                  "color": "#000000",
                  "name": "Coal"
                },
                {
                  "color": "#B15928",
                  "name": "Oil"
                },
                {
                  "color": "#BC80BD",
                  "name": "Gas"
                },
                {
                  "color": "#1F78B4",
                  "name": "Hydro"
                },
                {
                  "color": "#E31A1C",
                  "name": "Nuclear"
                },
                {
                  "color": "#FF7F00",
                  "name": "Solar"
                },
                {
                  "color": "#6A3D9A",
                  "name": "Waste"
                },
                {
                  "color": "#5CA2D1",
                  "name": "Wind"
                },
                {
                  "color": "#FDBF6F",
                  "name": "Geothermal"
                },
                {
                  "color": "#229A00",
                  "name": "Biomass"
                },
                {
                  "color": "#B2DF8A",
                  "name": "Others"
                }
              ],
              "type": "basic"
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-01-02T20:48:34.623Z",
            "order": 2
          },
          {
            "id": "155968b5-7c59-4065-9e3a-0a81d52d50de",
            "active": false,
            "name": "Fuel Type",
            "slug": "Fuel-Type",
            "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
            "description": "",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "5980838ae24e6a1dae3dd446",
            "default": false,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "wri-rw",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM powerwatch_data_20180102",
                      "cartocss": "#powerwatch_data_20180102 {marker-fill-opacity:1; marker-width:3; marker-line-width:0.3; marker-line-color:#FFF; marker-allow-overlap: true; marker-line-opacity:0;} [fuel1='Coal']{marker-fill:#000000;}[fuel1='Oil']{marker-fill:#B15928;}[fuel1='Gas']{marker-fill:#BC80BD;}[fuel1='Hydro']{marker-fill:#1F78B4;}[fuel1='Nuclear']{marker-fill:#E31A1C;}[fuel1='Solar']{marker-fill:#FF7F00;}[fuel1='Waste']{marker-fill:#6A3D9A;}[fuel1='Wind']{marker-fill:#5CA2D1;}[fuel1='Geothermal']{marker-fill:#FDBF6F;}[fuel1='Biomass']{marker-fill:#229A00;}[fuel1='Others']{marker-fill:#B2DF8A;}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "items": [
                {
                  "color": "#000000",
                  "name": "Coal"
                },
                {
                  "color": "#B15928",
                  "name": "Oil"
                },
                {
                  "color": "#BC80BD",
                  "name": "Gas"
                },
                {
                  "color": "#1F78B4",
                  "name": "Hydro"
                },
                {
                  "color": "#E31A1C",
                  "name": "Nuclear"
                },
                {
                  "color": "#FF7F00",
                  "name": "Solar"
                },
                {
                  "color": "#6A3D9A",
                  "name": "Waste"
                },
                {
                  "color": "#5CA2D1",
                  "name": "Wind"
                },
                {
                  "color": "#FDBF6F",
                  "name": "Geothermal"
                },
                {
                  "color": "#229A00",
                  "name": "Biomass"
                },
                {
                  "color": "#B2DF8A",
                  "name": "Others"
                }
              ],
              "type": "basic"
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-01-02T19:24:16.541Z",
            "order": 2
          },
          {
            "id": "5868a183-0f99-4c6d-93d1-8ddb7b4f2784",
            "active": false,
            "name": "Power Plant Capacity (MW)",
            "slug": "Capacity-MW_1",
            "dataset": "a86d906d-9862-4783-9e30-cdb68cd808b8",
            "description": "",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "5980838ae24e6a1dae3dd446",
            "default": false,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "wri-rw",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM powerwatch_data_20180102 ORDER BY capacity_mw ASC",
                      "cartocss": "#powerwatch_data_20180102 {marker-fill:#0099CC; marker-line-width:0.3; marker-line-color:#FFF; marker-allow-overlap: true; marker-line-opacity:0;} [capacity_mw <= 1500] {marker-fill-opacity: 0.6;}[capacity_mw > 1500] {marker-fill-opacity: 0.8;} [capacity_mw > 1500]{marker-width: 12.0+8.0*[capacity_mw]/22500.0;} [capacity_mw <= 1500]{marker-width: 4.0+8.0*[capacity_mw]/1500.0;}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "type": "basic",
              "items": [
                {
                  "name": "Capacity (1MW-22,500MW)",
                  "color": "#0099CC"
                }
              ]
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-01-02T20:46:54.806Z",
            "order": 2
          }
        ]
      },
      {
        "dataset": "a0aecb8d-07ee-42e6-be3d-e5cabf12b0a9",
        "visible": true,
        "layers": [
          {
            "id": "40dff26a-1f11-4c35-b261-e0c432b4ee77",
            "active": true,
            "name": "2014-2018 Number of Migrant Deaths",
            "slug": "2014-2017-Number-of-Migrant-Deaths",
            "dataset": "a0aecb8d-07ee-42e6-be3d-e5cabf12b0a9",
            "description": "Deaths along migratory routes worldwide from 2014 to the present.",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "58f63c81bd32c60206ed6b12",
            "default": false,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "rw-nrt",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM soc_018_missing_migrants",
                      "cartocss": "#layer{ marker-fill: ramp([number_dead], (#fcde9c, #f58670, #e34f6f, #d72d7c), jenks); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 0; marker-line-opacity: 1; [number_dead=null]{ marker-fill: #ababab;} [zoom < 4]{marker-width: 8;}  [zoom > 3]{marker-width: 12;}  [zoom > 6]{marker-width: 14;}  [zoom > 9]{marker-width: 16;}}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "type": "choropleth",
              "items": [
                {
                  "name": "<5",
                  "color": "#fcde9c"
                },
                {
                  "name": "<20",
                  "color": "#f58670"
                },
                {
                  "name": "<50",
                  "color": "#e34f6f"
                },
                {
                  "name": "<205",
                  "color": "#d72d7c"
                },
                {
                  "name": "No Data",
                  "color": "#ababab"
                }
              ]
            },
            "interactionConfig": {},
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-02-22T17:51:15.218Z",
            "order": 1
          },
          {
            "id": "0c094e37-4563-4633-9a38-28dd4a4724bf",
            "active": false,
            "name": "Migrant Deaths (past 30 days)",
            "slug": "Migrant-Deaths-past-30-days",
            "dataset": "a0aecb8d-07ee-42e6-be3d-e5cabf12b0a9",
            "description": "Migrant deaths reported in the past 30 days.",
            "application": [
              "rw"
            ],
            "iso": [],
            "provider": "cartodb",
            "userId": "58f63c81bd32c60206ed6b12",
            "default": true,
            "protected": false,
            "env": "production",
            "layerConfig": {
              "account": "rw-nrt",
              "body": {
                "maxzoom": 18,
                "minzoom": 3,
                "layers": [
                  {
                    "type": "mapnik",
                    "options": {
                      "sql": "SELECT * FROM soc_018_missing_migrants where (reported_date > current_date - interval '30 day')",
                      "cartocss": "#layer{ marker-fill: ramp([number_dead], (#fcde9c, #f58670, #e34f6f, #d72d7c), jenks); marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 0; marker-line-opacity: 1; [number_dead=null]{ marker-fill: #ababab;} [zoom < 4]{marker-width: 8;}  [zoom > 3]{marker-width: 12;}  [zoom > 6]{marker-width: 14;}  [zoom > 9]{marker-width: 16;}}",
                      "cartocss_version": "2.3.0"
                    }
                  }
                ]
              }
            },
            "legendConfig": {
              "type": "choropleth",
              "items": [
                {
                  "name": "<5",
                  "color": "#fcde9c"
                },
                {
                  "name": "<20",
                  "color": "#f58670"
                },
                {
                  "name": "<50",
                  "color": "#e34f6f"
                },
                {
                  "name": "<205",
                  "color": "#d72d7c"
                },
                {
                  "name": "No Data",
                  "color": "#ababab"
                }
              ]
            },
            "interactionConfig": {
              "output": [
                {
                  "column": "number_dead",
                  "format": "00000",
                  "prefix": "",
                  "property": "Number Dead",
                  "suffix": "",
                  "type": "number"
                }
              ]
            },
            "applicationConfig": {},
            "staticImageConfig": {},
            "updatedAt": "2018-02-27T17:30:08.964Z",
            "order": 1
          }
        ]
      }
    ]       
  }
/>
```
