
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
  interactionsLayer: layers.find(l => l.id === 'e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7'),
  interactionsSelected: 'e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7'
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

const events = {
  zoomend: (e, map) => { console.info(e, map); },
  dragend: (e, map) => { console.info(e, map); }
};

<Maps
  events={events}
>
  {(map) => (
    <React.Fragment>
      <LayerManager map={map} plugin={PluginLeaflet}>
        {layers.map((l, i) => (
          <Layer
            {...l}
            zIndex={1000 - i}

            // Interaction
            {...!!l.interactionConfig && l.interactionConfig.output && l.interactionConfig.output.length && {
              ...(l.provider === 'carto' || l.provider === 'cartodb') && { interactivity: l.interactionConfig.output.map(o => o.column) },
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
          interactions: state.interactions
        }}
      >
        {!!state.interactions[state.interactionsSelected] && !!state.interactions[state.interactionsSelected].data &&
          <table>
            <tbody>
              {state.interactionsLayer.interactionConfig.output.map(o => {
                const data = state.interactions[state.interactionsSelected].data;

                if (!data) {
                  return 'No data';
                }

                return (
                  <tr key={o.property || o.column}>
                    <td>
                      {o.property || o.column}
                    </td>
                    <td>
                      {data[o.column]}
                    </td>                
                  </tr>
                )
              })}
            </tbody>
          </table>
        }

        {!!state.interactions[state.interactionsSelected] && !state.interactions[state.interactionsSelected].data &&
          'No data'
        }
      </MapPopup>

    </React.Fragment>
  )}
</Maps>

```
