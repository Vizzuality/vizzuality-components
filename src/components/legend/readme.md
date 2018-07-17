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

} from 'wri-api-components';
</pre>

### Full legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendListItem = require('./components/legend-list-item').default;
const LegendItemToolbar = require('./components/legend-item-toolbar').default;
const LegendItemTypes = require('./components/legend-item-types').default;
const LegendItemTimeline = require('./components/legend-item-timeline').default;
const LegendItemVisibility = require('./components/legend-item-toolbar/legend-item-button-visibility').default;

<Legend
  LegendItemToolbar={<LegendItemToolbar />}
  LegendItemTypes={<LegendItemTypes />}
  layerGroups={layerGroups}
>
  {layerGroups.map((lg, i) => (
    <LegendListItem
      index={i}
      key={lg.dataset}
      layerGroup={lg}
      toolbar={
        <LegendItemToolbar>
          <LegendItemVisibility iconShow="icon-hide" iconHide="icon-show" />
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

const LegendItemToolbar = require('./legend-list/legend-item/legend-item-toolbar').default;
const LegendItemTypes = require('./legend-list/legend-item/legend-item-types').default;

<Legend
  maxWidth={500}
  maxHeight={300}
  LegendItemToolbar={<LegendItemToolbar />}
  LegendItemTypes={<LegendItemTypes />}
  layerGroups={layerGroups}
/>
```


### Not draggable legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendItemTypes = require('./legend-list/legend-item/legend-item-types').default;

<Legend
  sortable={false}
  layerGroups={layerGroups}
  LegendItemTypes={<LegendItemTypes />}
/>
```

### Collapsed legend
```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendItemToolbar = require('./legend-list/legend-item/legend-item-toolbar').default;
const LegendItemTypes = require('./legend-list/legend-item/legend-item-types').default;

<Legend
  expanded={false}
  LegendItemToolbar={<LegendItemToolbar />}
  LegendItemTypes={<LegendItemTypes />}
  layerGroups={layerGroups}
/>
```
