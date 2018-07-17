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

  // Timeline
  LegendItemTimeline

} from 'wri-api-components';
</pre>

### Full legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemTimeline = require('./components/legend-item-timeline').default;
const LegendItemButtonVisibility = require('./components/legend-item-toolbar/legend-item-button-visibility').default;

<Legend
  layerGroups={layerGroups}
>
  {layerGroups.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar>
          <LegendItemButtonVisibility iconShow="icon-hide" iconHide="icon-show" />
        </LegendItemToolbar>
      }
    >
      <LegendItemTypes />
      <LegendItemTimeline onChangeLayer={l => console.info(l)} />
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
const LegendItemTimeline = require('./components/legend-item-timeline').default;

<Legend
  maxWidth={500}
  maxHeight={300}
  layerGroups={layerGroups}
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
      <LegendItemTimeline onChangeLayer={l => console.info(l)} />
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
const LegendItemTimeline = require('./components/legend-item-timeline').default;

<Legend
  sortable={false}
  layerGroups={layerGroups}
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
      <LegendItemTimeline onChangeLayer={l => console.info(l)} />
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
const LegendItemTimeline = require('./components/legend-item-timeline').default;

<Legend
  expanded={false}
  sortable={false}
  layerGroups={layerGroups}
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
      <LegendItemTimeline onChangeLayer={l => console.info(l)} />
    </LegendListItem>
  ))}
</Legend>
```
