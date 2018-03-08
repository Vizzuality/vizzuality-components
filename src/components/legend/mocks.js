export const layerGroups = [
  {
    dataset: '28dd2700-6de7-4345-830a-a5ffa0716bb2',
    visible: true,
    layers: [
      {
        "active": true,
        "id": "acfc2b99-a06b-4763-83e5-7e14539940b3",
        "type": "layer",
        "name": "Probabilities of Urban Expansion 2030",
        "slug": "Probabilities-of-Urban-Expansion-2030",
        "dataset": "0a59f415-ee0b-4d19-96f7-c7304c152e1b",
        "description": "The Global Grid of Probabilities of Urban Expansion details likely future areas of urban expansion up to 2030.",
        "application": ["rw"],
        "iso": [],
        "provider": "cartodb",
        "userId": "58fde4354eecd9073107af0f",
        "default": true,
        "protected": false,
        "env": "production",
        "layerConfig": {
          "body": {
            "layers": [
              {
                "options": {
                  "raster_band": 1,
                  "geom_type": "raster",
                  "geom_column": "the_raster_webmercator",
                  "cartocss_version": "2.3.0",
                  "cartocss": "#layer {raster-opacity:1; raster-scaling:near; raster-colorizer-default-mode: linear; raster-colorizer-default-color:  transparent; raster-colorizer-epsilon:0.11; raster-colorizer-stops: stop(0.1, #fef0d9) stop(20, #fdd49e) stop(40, #fdbb84) stop(60, #fc8d59) stop(80, #e34a33) stop(100, #b30000) stop(101, #7f0000)}",
                  "sql": "SELECT * FROM global_grid_prob_urban_expansion_2030_wgs84"
                },
                "type": "cartodb"
              }
            ],
            "minzoom": 3,
            "maxzoom": 18
          },
          "account": "insights"
        },
        "legendConfig": {
          "items": [
            {
              "color": "#fef0d9",
              "name": "1%"
            }, {
              "color": "#fef0d9",
              "name": "20%"
            }, {
              "color": "#fdbb84",
              "name": "40%"
            }, {
              "color": "#fc8d59",
              "name": "60%"
            }, {
              "color": "#e34a33",
              "name": "80%"
            }, {
              "color": "#b30000",
              "name": "100%"
            }, {
              "color": "#7f0000",
              "name": "Urban"
            }
          ],
          "type": "gradient"
        },
        "interactionConfig": {},
        "applicationConfig": {},
        "staticImageConfig": {},
        "updatedAt": "2017-11-28T18:38:01.097Z"
      }
    ]
  }, {
    dataset: 'ccbcaf7b-1619-4298-8275-b135d1e8e04e',
    visible: true,
    layers: [
      {
        id: 'd787d894-f7af-47c4-af0f-0849b06686ee',
        active: true,
        name: '2015 Accessibility to Cities',
        slug: 'Travel-Time-to-Major-Cities_1',
        dataset: 'ccbcaf7b-1619-4298-8275-b135d1e8e04e',
        description: 'Time it takes to travel to the nearest city in 2015. Units are minutes, hours, days, and months.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '5980838ae24e6a1dae3dd446',
        default: true,
        protected: false,
        env: 'production',
        layerConfig: {
          body: {
            sldValue: "<RasterSymbolizer>    <ColorMap  type=\"ramp\" extended=\"false\" >      '<ColorMapEntry color=\"#FFFFFF\" quantity=\"0\" opacity=\"1\" />' +    '<ColorMapEntry color=\"#C0F09C\" quantity=\"60\" opacity=\"1\" />' +    '<ColorMapEntry color=\"#E3DA64\" quantity=\"120\"  />' +  '<ColorMapEntry color=\"#D16638\" quantity=\"180\"  />' +    '<ColorMapEntry color=\"#BA2D2F\" quantity=\"360\" />' +   '<ColorMapEntry color=\"#A11F4A\" quantity=\"720\"  />' +    '<ColorMapEntry color=\"#730D6F\" quantity=\"1440\"  />' +    '<ColorMapEntry color=\"#0D0437\" quantity=\"20160\"  />' +  '<ColorMapEntry color=\"#00030F\" quantity=\"41556\"  />' +    </ColorMap></RasterSymbolizer>",
            styleType: 'sld'
          },
          assetId: 'Oxford/MAP/accessibility_to_cities_2015_v1_0',
          type: 'gee'
        },
        legendConfig: {
          items: [
            {
              name: '0 h',
              color: '#FFFFFF'
            }, {
              color: '#C0F09C',
              name: '1 h'
            }, {
              color: '#E3DA64',
              name: '2 h'
            }, {
              color: '#D16638',
              name: '3 h'
            }, {
              color: '#BA2D2F',
              name: '6 h'
            }, {
              color: '#A11F4A',
              name: '12 h'
            }, {
              color: '#730D6F',
              name: '1 d'
            }, {
              color: '#0D0437',
              name: '14 d'
            }, {
              color: '#00030F',
              name: '1 m'
            }
          ],
          type: 'choropleth'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-17T22:29:02.801Z',
        order: 3
      }
    ]
  }, {
    dataset: '3c82c421-8964-444e-86f2-df800174d8b9',
    visible: true,
    layers: [
      {
        id: '24808bb8-1dbf-450e-8f6b-c090533f5d14',
        active: true,
        name: 'Cumulative Climate Impacts on Marine Ecosystems',
        slug: 'Cumulative-Climate-Impacts-on-Marine-Ecosystems',
        dataset: '3c82c421-8964-444e-86f2-df800174d8b9',
        description: 'Index of cumulative impact of equally weighted changes in sea surface temperature (1980–2014), chlorophyll (1979–2014), and ocean currents (1980–2014). Colors represent a dimensionless index of global impact (Cumulative Impact Index), ranging from 0 (no change) to 1 (maximum change), highlighting marine areas that have undergone the largest changes in their environmental conditions.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '5980838ae24e6a1dae3dd446',
        default: true,
        protected: false,
        env: 'production',
        layerConfig: {
          body: {
            sldValue: "<RasterSymbolizer>    <ColorMap  type=\"ramp\" extended=\"false\" >      '<ColorMapEntry color=\"#f1eef6\" quantity=\"-9999\"  opacity=\"0\" />' +   '<ColorMapEntry color=\"#440154\" quantity=\"0\"  opacity=\"1\" />' +   '<ColorMapEntry color=\"#404387\" quantity=\"0.2\"  />' +    '<ColorMapEntry color=\"#29788E\" quantity=\"0.4\"  />' +  '<ColorMapEntry color=\"#22A784\" quantity=\"0.6\"  />' +   '<ColorMapEntry color=\"#79D151\" quantity=\"0.8\"  />' +   '<ColorMapEntry color=\"#FDE724\" quantity=\"1\"  />' +  </ColorMap></RasterSymbolizer>",
            styleType: 'sld'
          },
          assetId: 'users/resourcewatch/bio_008_cumulative_climate_impacts',
          type: 'gee'
        },
        legendConfig: {
          items: [
            {
              color: '#404387',
              name: '≤0.2'
            }, {
              color: '#29788E',
              name: '≤0.4'
            }, {
              color: '#22A784',
              name: '≤0.6'
            }, {
              color: '#79D151',
              name: '≤0.8'
            }, {
              color: '#FDE724',
              name: '≤1'
            }
          ],
          type: 'choropleth'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-15T23:28:12.625Z',
        order: 2
      }
    ]
  }, {
    dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
    visible: true,
    layers: [
      {
        id: 'f66acc52-455b-44d9-ad48-d10a301a0f4f',
        active: true,
        name: '2015 Surface Water Extent',
        slug: '2015-Water-Surface-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2015.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: true,
        protected: false,
        env: 'production',
        layerConfig: {
          timeline: true,
          timelineLabel: '2015',
          order: 2015,
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/31',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>'
          }
        },
        legendConfig: {
          type: 'basic',
          items: [
            {
              name: 'Seasonal Water',
              color: '#98AFC7'
            }, {
              name: 'Permanent Water',
              color: '#4863A0'
            }
          ]
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:28:19.045Z',
        order: 1
      }, {
        id: '636d8122-db4f-4e9b-a34a-819bde4f1fe9',
        active: false,
        name: '2014 Surface Water Extent',
        slug: '2014-Water-Surface-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2014.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          body: {
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>',
            styleType: 'sld'
          },
          assetId: 'JRC/GSW1_0/YearlyHistory/30',
          type: 'gee',
          timeline: true,
          timelineLabel: '2014',
          order: 2014
        },
        legendConfig: {
          items: [
            {
              color: '#98AFC7',
              name: 'Seasonal Water'
            }, {
              color: '#4863A0',
              name: 'Permanent Water'
            }
          ],
          type: 'basic'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:31:45.300Z',
        order: 1
      }, {
        id: 'b50fb94a-8f57-4a89-a19c-5111e63327a3',
        active: false,
        name: '2013 Surface Water Extent',
        slug: '2013-Water-Surface-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2013.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          body: {
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>',
            styleType: 'sld'
          },
          assetId: 'JRC/GSW1_0/YearlyHistory/29',
          type: 'gee',
          timeline: true,
          order: 2013,
          timelineLabel: '2013'
        },
        legendConfig: {
          items: [
            {
              color: '#98AFC7',
              name: 'Seasonal Water'
            }, {
              color: '#4863A0',
              name: 'Permanent Water'
            }
          ],
          type: 'basic'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:32:21.250Z',
        order: 1
      }, {
        id: '1e4968d1-d4e5-489c-a4b3-47631f9579b5',
        active: false,
        name: '2012 Surface Water Extent',
        slug: '2012-Water-Surface-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2012.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          body: {
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>',
            styleType: 'sld'
          },
          assetId: 'JRC/GSW1_0/YearlyHistory/28',
          type: 'gee',
          timeline: true,
          order: 2012,
          timelineLabel: '2012'
        },
        legendConfig: {
          items: [
            {
              color: '#98AFC7',
              name: 'Seasonal Water'
            }, {
              color: '#4863A0',
              name: 'Permanent Water'
            }
          ],
          type: 'basic'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:33:47.623Z',
        order: 1
      }, {
        id: 'afb14906-fd45-447e-a42a-54a53b90e512',
        active: false,
        name: '2011 Surface Water Extent',
        slug: '2011-Water-Surface-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2011.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          timeline: true,
          timelineLabel: '2011',
          order: 2011,
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/27',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>'
          }
        },
        legendConfig: {
          items: [
            {
              color: '#98AFC7',
              name: 'Seasonal Water'
            }, {
              color: '#4863A0',
              name: 'Permanent Water'
            }
          ],
          type: 'basic'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:39:30.841Z',
        order: 1
      }, {
        id: 'd02d6e88-b31a-477c-88ea-4085e5f611cf',
        active: false,
        name: '2010 Surface Water Extent',
        slug: '2000-Surface-Water-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2010.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          timeline: true,
          timelineLabel: '2010',
          order: 2010,
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/26',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>'
          }
        },
        legendConfig: {
          items: [
            {
              color: '#98AFC7',
              name: 'Seasonal Water'
            }, {
              color: '#4863A0',
              name: 'Permanent Water'
            }
          ],
          type: 'basic'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:37:50.652Z',
        order: 1
      }, {
        id: '40444eb3-e834-4907-9415-9fedeecf2eef',
        active: false,
        name: '2009 Surface Water Extent',
        slug: '2009-Surface-Water-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2009.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/25',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>'
          },
          timeline: true,
          order: 2009,
          timelineLabel: '2009'
        },
        legendConfig: {
          type: 'basic',
          items: [
            {
              name: 'Seasonal Water',
              color: '#98AFC7'
            }, {
              name: 'Permanent Water',
              color: '#4863A0'
            }
          ]
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:41:23.427Z',
        order: 1
      }, {
        id: 'f9d25147-66c1-4c06-ac75-351c09d0ea39',
        active: false,
        name: '2008 Surface Water Extent',
        slug: '2008-Surface-Water-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2008.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          body: {
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>',
            styleType: 'sld'
          },
          assetId: 'JRC/GSW1_0/YearlyHistory/24',
          type: 'gee',
          timeline: true,
          order: 2008,
          timelineLabel: '2008'
        },
        legendConfig: {
          items: [
            {
              color: '#98AFC7',
              name: 'Seasonal Water'
            }, {
              color: '#4863A0',
              name: 'Permanent Water'
            }
          ],
          type: 'basic'
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:42:28.715Z',
        order: 1
      }, {
        id: '2472a4e7-c676-4458-b857-61c82f1e903a',
        active: false,
        name: '2007 Surface Water Extent',
        slug: '2007-Surface-Water-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2007.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/23',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>'
          },
          timeline: true,
          order: 2007,
          timelineLabel: '2007'
        },
        legendConfig: {
          type: 'basic',
          items: [
            {
              name: 'Seasonal Water',
              color: '#98AFC7'
            }, {
              name: 'Permanent Water',
              color: '#4863A0'
            }
          ]
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:44:52.058Z',
        order: 1
      }, {
        id: '50df3494-ba06-4cc8-8525-64dd7e460a44',
        active: false,
        name: '2006 Surface Water Extent',
        slug: '2006-Surface-Water-Extent',
        dataset: 'b8307c16-fd77-4e35-9b68-8726a025f401',
        description: 'Extent of seasonal water and permanent water in 2006.',
        application: ['rw'],
        iso: [],
        provider: 'gee',
        userId: '58fa22c54eecd907310778cd',
        default: false,
        protected: false,
        env: 'production',
        layerConfig: {
          type: 'gee',
          assetId: 'JRC/GSW1_0/YearlyHistory/22',
          body: {
            styleType: 'sld',
            sldValue: '<RasterSymbolizer>    <ColorMap  type="values" extended="false" >        <ColorMapEntry color="#ffffff" quantity="0" label="" opacity="0" />        <ColorMapEntry color="#228B22" quantity="1" label="" opacity="0" />    <ColorMapEntry color="#98AFC7" quantity="2" label="" />     <ColorMapEntry color="#4863A0" quantity="3" label="" />    </ColorMap></RasterSymbolizer>'
          },
          timeline: true,
          order: 2006,
          timelineLabel: '2006'
        },
        legendConfig: {
          type: 'basic',
          items: [
            {
              name: 'Seasonal Water',
              color: '#98AFC7'
            }, {
              name: 'Permanent Water',
              color: '#4863A0'
            }
          ]
        },
        interactionConfig: {},
        applicationConfig: {},
        staticImageConfig: {},
        updatedAt: '2018-01-18T15:50:26.452Z',
        order: 1
      }
    ]
  }
];
