### Full legend

```jsx
const layerGroups = require('./mocks').layerGroups;

const LegendItemToolbar = require('./legend-list/legend-item/legend-item-toolbar').default;
const LegendItemTypes = require('./legend-list/legend-item/legend-item-types').default;

<Legend
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
