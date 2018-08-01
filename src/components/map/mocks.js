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
  }
];
