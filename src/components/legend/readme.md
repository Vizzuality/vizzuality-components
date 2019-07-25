### Components available
<pre>
import {
  // Legend
  Legend,

  // Toolbar
  LegendItemToolbar,
  LegendItemButtonBBox,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonInfo,
  LegendItemButtonRemove,

  // Types
  LegendItemTypes,
  LegendItemTypeBasic,
  LegendItemTypeChoropleth,
  LegendItemTypeGradient,
  LegendItemTypeProportional

  // timestep
  LegendItemTimestep

} from 'vizzuality-components';
</pre>

### Legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemButtonVisibility = require('./components/legend-item-toolbar/legend-item-button-visibility').default;
const LegendItemTimestep = require('./components/legend-item-timestep').default;

const layerGroupsParsed = layerGroups.map(lg => ({
  ...lg,
  layers: lg.layers.map(layer => ({
    ...layer,
    ...layer.layerConfig && layer.layerConfig.timeline_config && {
      timelineParams: {
        ...layer.layerConfig.timeline_config,
        canPlay: true,
        minDate: "2001-01-01",
        maxDate: "2017-12-31",
        startDate: "2004-09-27",
        endDate: "2010-09-14",
        trimEndDate: "2016-09-14"
      }
    }
  }))
}));

<Legend
  onChangeOrder={(datasetIds) => { console.info(datasetIds)}}
>
  {layerGroupsParsed.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={<LegendItemToolbar />}
    >
      <LegendItemTypes />
      <LegendItemTimestep 
        handleChange={dates => {}}
        trackStyle={[
          {
            backgroundColor: '#c32d7b',
            borderRadius: '0px'
          },
          {
            backgroundColor: '#F660AE',
            borderRadius: '0px'
          }
        ]}
      />
    </LegendListItem>
  ))}
</Legend>
```

### Max width & max height legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemTimestep = require('./components/legend-item-timestep').default;

const layerGroupsParsed = layerGroups.map(lg => ({
  ...lg,
  layers: lg.layers.map(layer => ({
    ...layer,
    ...layer.layerConfig && layer.layerConfig.timeline_config && {
      timelineParams: {
        ...layer.layerConfig.timeline_config,
        canPlay: true,
        minDate: "2001-01-01",
        maxDate: "2017-12-31",
        startDate: "2004-09-27",
        endDate: "2010-09-14",
        trimEndDate: "2016-09-14"
      }
    }
  }))
}));

<Legend
  maxWidth={500}
  maxHeight={300}
>
  {layerGroupsParsed.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar />
      }
    >
      <LegendItemTypes />
      <LegendItemTimestep 
        handleChange={dates => {}}
        trackStyle={[
          {
            backgroundColor: '#c32d7b',
            borderRadius: '0px'
          },
          {
            backgroundColor: '#F660AE',
            borderRadius: '0px'
          }
        ]}
      />
    </LegendListItem>
  ))}
</Legend>
```


### Not draggable legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemTimestep = require('./components/legend-item-timestep').default;

const layerGroupsParsed = layerGroups.map(lg => ({
  ...lg,
  layers: lg.layers.map(layer => ({
    ...layer,
    ...layer.layerConfig && layer.layerConfig.timeline_config && {
      timelineParams: {
        ...layer.layerConfig.timeline_config,
        canPlay: true,
        minDate: "2001-01-01",
        maxDate: "2017-12-31",
        startDate: "2004-09-27",
        endDate: "2010-09-14",
        trimEndDate: "2016-09-14"
      }
    }
  }))
}));

<Legend
  sortable={false}
>
  {layerGroupsParsed.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar />
      }
    >
      <LegendItemTypes />
      <LegendItemTimestep 
        handleChange={dates => {}}
        trackStyle={[
          {
            backgroundColor: '#c32d7b',
            borderRadius: '0px'
          },
          {
            backgroundColor: '#F660AE',
            borderRadius: '0px'
          }
        ]}
      />
    </LegendListItem>
  ))}
</Legend>
```

### Collapsed legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemTimestep = require('./components/legend-item-timestep').default;

const layerGroupsParsed = layerGroups.map(lg => ({
  ...lg,
  layers: lg.layers.map(layer => ({
    ...layer,
    ...layer.layerConfig && layer.layerConfig.timeline_config && {
      timelineParams: {
        ...layer.layerConfig.timeline_config,
        canPlay: true,
        minDate: "2001-01-01",
        maxDate: "2017-12-31",
        startDate: "2004-09-27",
        endDate: "2010-09-14",
        trimEndDate: "2016-09-14"
      }
    }
  }))
}));

<Legend
  expanded={false}
  sortable={false}
>
  {layerGroupsParsed.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar />
      }
    >
      <LegendItemTypes />
      <LegendItemTimestep 
        handleChange={dates => {}}
        trackStyle={[
          {
            backgroundColor: '#c32d7b',
            borderRadius: '0px'
          },
          {
            backgroundColor: '#F660AE',
            borderRadius: '0px'
          }
        ]}
      />
    </LegendListItem>
  ))}
</Legend>
```
