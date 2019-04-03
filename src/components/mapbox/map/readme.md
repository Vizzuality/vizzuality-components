
### Requirements
<pre>
yarn add react-map-gl
</pre>

### Components available
<pre>
import { MapboxMap } from 'vizzuality-components';
</pre>

### Map
```jsx
<div style={{ width: '100%', height: 500 }}>
  <MapboxMap
    bounds={{
      bbox: [18.654785,-23.241346,29.94873,-15.834536]
    }}
    mapboxApiAccessToken="pk.eyJ1IjoiYWZpbGF0b3JlOTAiLCJhIjoiY2lqcml0bHoyMDBhZHZwbHhzM2Q1bnRwNSJ9.Zm2C1hNemolKnIAAWquGYg"
    mapStyle="mapbox://styles/mapbox/satellite-streets-v10"

    zoom={15}
  />
</div>
```