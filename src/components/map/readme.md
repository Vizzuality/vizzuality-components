
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
        {layerManager => layers.map((l, i) => (
          <Layer
            layerManager={layerManager}
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


### Map Side By Side
```jsx

const sideBySideLayers = require('./mocks').sideBySideLayers;

initialState = {
  latlng: null,
  interactions: {},
  interactionsLayers: sideBySideLayers,
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

// SIDE BY SIDE
const MapSideBySide = require('./map-side-by-side').default;

const events = {
  zoomend: (e, map) => { console.info(e, map); },
  dragend: (e, map) => { console.info(e, map); }
};

<Maps
  mapOptions={{
    zoom: 2,
    center: { lat: 0, lng: 0 }
  }}
  events={events}
>
  {(map) => (
    <React.Fragment>
      <LayerManager map={map} plugin={PluginLeaflet}>
        {layerManager => sideBySideLayers.map((l, i) => (
          <Layer
            key={l.id}
            layerManager={layerManager}
            {...l}
            zIndex={1000 - i}

            // Interaction
            // This interaction with the side by side doesn't work very well together
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

            onReady={(layers) => {
              const setLayers = {
                0: 'setLeftLayers',
                1: 'setRightLayers'
              };
              
              layers.forEach((l, i) => {
                console.log(l);
                const { mapLayer } = l;

                if (mapLayer.group) {
                  mapLayer.getLayers().forEach((l, j) => {
                    if (j === 0) {
                      this.sideBySide[setLayers[i]](l);
                    }
                  });
                } else {
                  this.sideBySide[setLayers[i]](mapLayer);
                }
              })
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

      <MapSideBySide
        map={map}
        onReady={(sideBySide) => { this.sideBySide = sideBySide; }}
      />

    </React.Fragment>
  )}
</Maps>
