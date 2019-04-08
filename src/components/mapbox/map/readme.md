
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
initialState = {
  bbox: [23.3946500001181,-17.8706799998146,23.5238299999323,-17.6200799996625]
};

<div style={{ width: '100%', height: 500 }} onClick={() => setState({ bbox: [24.3946500001181,-7.8706799998146, 24.5238299999323,-7.6200799996625]})}>
  <MapboxMap
    bounds={{
      bbox: state.bbox,
      options: {
        padding: 50
      }
    }}
    viewport={{
      bearing: 20,
      pitch: 45
    }}
    mapboxApiAccessToken="pk.eyJ1IjoiYWZpbGF0b3JlOTAiLCJhIjoiY2lqcml0bHoyMDBhZHZwbHhzM2Q1bnRwNSJ9.Zm2C1hNemolKnIAAWquGYg"
    mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
    onViewportChange={(viewport) => { console.log(viewport); }}
  >
    {(map) => {
      <h1>This is a title</h1>
    }}
  </MapboxMap>
</div>
```