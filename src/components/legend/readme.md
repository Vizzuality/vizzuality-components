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

} from 'wri-api-components';
</pre>

### Legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemButtonVisibility = require('./components/legend-item-toolbar/legend-item-button-visibility').default;

<Legend
  onChangeOrder={(datasetIds) => { console.info(datasetIds)}}
>
  {layerGroups.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={<LegendItemToolbar />}
    >
      <LegendItemTypes />
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

<Legend
  maxWidth={500}
  maxHeight={300}
>
  {layerGroups.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar />
      }
    >
      <LegendItemTypes />
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

<Legend
  sortable={false}
>
  {layerGroups.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar />
      }
    >
      <LegendItemTypes />
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

<Legend
  expanded={false}
  sortable={false}
>
  {layerGroups.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar />
      }
    >
      <LegendItemTypes />
    </LegendListItem>
  ))}
</Legend>
```

### Timestep legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemTimestep = require('./components/legend-item-timestep').default;

const timelineConfig = {
  canPlay: true,
  dateFormat: "YYYY",
  interval: "years",
  minDate: "2001-01-01",
  maxDate: "2017-12-31",
  startDate: "2004-09-27",
  endDate: "2010-09-14",
  trimEndDate: "2016-09-14",
  speed: 250,
  step: 1
};


<Legend
  expanded={true}
  sortable={true}
>
  {layerGroups.map((lg, i) => (
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
        handleChange={dates => { console.log(dates); }} 
        {...timelineConfig}
      />
    </LegendListItem>
  ))}
</Legend>  
```
