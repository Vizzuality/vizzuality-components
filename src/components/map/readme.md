
### Requirements
<pre>
` 
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"/>
<script src="https://unpkg.com/esri-leaflet/dist/esri-leaflet.js" />
<script src="https://unpkg.com/leaflet-utfgrid/L.UTFGrid-min.js" />
`
</pre>

### Components available
<pre>
import { Map, MapControls, ZoomControl } from 'wri-api-components';
</pre>

### Map
```jsx

const layers = require('./mocks').layers;

initialState = {
  latlng: null,
  interactions: {},
  interactionsLayers: layers,
  interactionsSelected: 'e9f9d20c-1924-48b2-97ed-6936e233adb2'
  // interactionsSelected: 'e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7'
}


// LAYER MANAGER
const LayerManager = require('layer-manager/dist/react').LayerManager;
const Layer = require('layer-manager/dist/react').Layer;
const PluginLeaflet = require('layer-manager').PluginLeaflet;

// CONTROLS
const MapControls = require('./map-controls').default;
const ZoomControl = require('./map-controls/zoom-control').default;


// POPUP
const MapPopup = require('./map-popup').default;
const MapPopupExample = require('./map-popup/example').default;

const events = {
  zoomend: (e, map) => { console.info(e, map); },
  dragend: (e, map) => { console.info(e, map); }
};

<Maps
  mapOptions={{
    zoom: 5,
    center: { lat: 56, lng: -119 }
  }}
  events={events}
>
  {(map) => (
    <React.Fragment>
      <LayerManager map={map} plugin={PluginLeaflet}>
        {layers.map((l, i) => (
          <Layer
            console={console.log(!!l.interactionConfig && !!l.interactionConfig.output && !!l.interactionConfig.output.length)}
            key={l.id}
            {...l}
            zIndex={1000 - i}

            // Interaction
            {...!!l.interactionConfig && !!l.interactionConfig.output && !!l.interactionConfig.output.length && {
              interactivity: (l.provider === 'carto' || l.provider === 'cartodb') ? l.interactionConfig.output.map(o => o.column) : true,
              events: {
                click: (e) => {
                  setState({
                    interactions: { ...state.interactions, [l.id]: e },
                    latlng: e.latlng
                  })
                }
              }
            }}
          />
        ))}
      </LayerManager>

      <MapControls>
        <ZoomControl map={map} />
      </MapControls>

      <MapPopup
        map={map}
        latlng={state.latlng}
        data={{
          latlng: state.latlng,
          interactions: state.interactions,
          interactionsLayer: state.interactionsLayers.find(l => l.id === state.interactionsSelected),
          interactionsSelected: state.interactionsSelected
        }}
      >
        <MapPopupExample />
      </MapPopup>

    </React.Fragment>
  )}
</Maps>

```
