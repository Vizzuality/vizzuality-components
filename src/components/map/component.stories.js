/* eslint-disable react/prop-types */
import React from 'react';
import { LayerManager, Layer } from 'layer-manager/lib/react';
import { PluginLeaflet } from 'layer-manager';
import Icons from 'components/icons';
import Component, { MapPopup, MapControls, ZoomControl } from './index';
import { layers } from './mocks';
import MapPopupExample from './map-popup/example';
import MapSideBySide from './map-side-by-side';

export default {
  title: 'Map',
  component: Component,
  decorators: [
    (Story) => (
      <div>
        <p>Components available:</p>
        <pre>
          import &#123; Map, MapControls, ZoomControl &#125; from &apos;vizzuality-components&apos;;
        </pre>
        <p>Requirements:</p>
        <pre>
          &lt;link rel=&quot;stylesheet&quot;
          href=&quot;https://unpkg.com/leaflet@1.3.1/dist/leaflet.css&quot; /&gt;
          <br />
          &lt;script
          src=&quot;https://unpkg.com/leaflet@1.3.1/dist/leaflet.js&quot;&gt;&lt;/script&gt;
          <br />
          &lt;script
          src=&quot;https://unpkg.com/esri-leaflet/dist/esri-leaflet.js&quot;&gt;&lt;/script&gt;
          <br />
          &lt;script
          src=&quot;https://unpkg.com/leaflet-utfgrid/L.UTFGrid-min.js&quot;&gt;&lt;/script&gt;
        </pre>
        <Icons />
        <Story />
      </div>
    ),
  ],
};

export const Simple = (props) => {
  const [latlng, setLatlng] = React.useState(null);
  const [interactions, setInteractions] = React.useState({});
  const [interactionsLayers] = React.useState(layers);
  const [interactionsSelected] = React.useState('e9f9d20c-1924-48b2-97ed-6936e233adb2');

  const events = {
    zoomend: (e, map) => {
      console.info(e, map);
    },
    dragend: (e, map) => {
      console.info(e, map);
    },
  };

  return (
    <Component events={events} {...props}>
      {(map) => (
        <>
          <LayerManager map={map} plugin={PluginLeaflet}>
            {(layerManager) =>
              layers.map((l, i) => (
                <Layer
                  layerManager={layerManager}
                  key={l.id}
                  {...l}
                  zIndex={1000 - i}
                  // Interaction
                  {...(!!l.interactionConfig &&
                    !!l.interactionConfig.output &&
                    !!l.interactionConfig.output.length && {
                      interactivity:
                        l.provider === 'carto' || l.provider === 'cartodb'
                          ? l.interactionConfig.output.map((o) => o.column)
                          : true,
                      events: {
                        click: (e) => {
                          setInteractions({ ...interactions, [l.id]: e });
                          setLatlng(e.latlng);
                        },
                      },
                    })}
                />
              ))
            }
          </LayerManager>

          <MapControls>
            <ZoomControl map={map} />
          </MapControls>

          <MapPopup
            map={map}
            latlng={latlng}
            data={{
              latlng: latlng,
              interactions: interactions,
              interactionsLayer: interactionsLayers.find((l) => l.id === interactionsSelected),
              interactionsSelected: interactionsSelected,
            }}
          >
            <MapPopupExample />
          </MapPopup>
        </>
      )}
    </Component>
  );
};
Simple.args = {
  mapOptions: {
    zoom: 5,
    center: { lat: 56, lng: -119 },
  },
  basemap: {
    url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  label: {
    url: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  bounds: {
    bbox: null,
    options: {}, // fitBounds options
  },
};

export const SideBySide = (props) => {
  const [latlng, setLatlng] = React.useState(null);
  const [interactions, setInteractions] = React.useState({});
  const [interactionsLayers] = React.useState(layers);
  const [interactionsSelected] = React.useState('e9f9d20c-1924-48b2-97ed-6936e233adb2');

  const events = {
    zoomend: (e, map) => {
      console.info(e, map);
    },
    dragend: (e, map) => {
      console.info(e, map);
    },
  };

  let sideBySide = {};

  return (
    <Component events={events} {...props}>
      {(map) => (
        <>
          <LayerManager map={map} plugin={PluginLeaflet}>
            {(layerManager) =>
              layers.map((l, i) => (
                <Layer
                  layerManager={layerManager}
                  key={l.id}
                  {...l}
                  zIndex={1000 - i}
                  // Interaction
                  {...(!!l.interactionConfig &&
                    !!l.interactionConfig.output &&
                    !!l.interactionConfig.output.length && {
                      interactivity:
                        l.provider === 'carto' || l.provider === 'cartodb'
                          ? l.interactionConfig.output.map((o) => o.column)
                          : true,
                      events: {
                        click: (e) => {
                          setInteractions({ ...interactions, [l.id]: e });
                          setLatlng(e.latlng);
                        },
                      },
                    })}
                  onReady={(layers) => {
                    const setLayers = {
                      0: 'setLeftLayers',
                      1: 'setRightLayers',
                    };

                    layers.forEach((lm, i) => {
                      const { mapLayer } = lm;
                      if (mapLayer.group) {
                        mapLayer.getLayers().forEach((l, j) => {
                          if (j === 0) {
                            if (typeof sideBySide[setLayers[i]] === 'function')
                              sideBySide[setLayers[i]](l);
                          }
                        });
                      } else {
                        if (typeof sideBySide[setLayers[i]] === 'function')
                          sideBySide[setLayers[i]](mapLayer);
                      }
                    });
                  }}
                />
              ))
            }
          </LayerManager>

          <MapControls>
            <ZoomControl map={map} />
          </MapControls>

          <MapPopup
            map={map}
            latlng={latlng}
            data={{
              latlng: latlng,
              interactions: interactions,
              interactionsLayer: interactionsLayers.find((l) => l.id === interactionsSelected),
              interactionsSelected: interactionsSelected,
            }}
          >
            <MapPopupExample />
          </MapPopup>

          <MapSideBySide
            map={map}
            onReady={(ref) => {
              sideBySide = ref;
            }}
          />
        </>
      )}
    </Component>
  );
};
SideBySide.storyName = 'Side by side';
SideBySide.args = {
  mapOptions: {
    zoom: 2,
    center: { lat: 0, lng: 0 },
  },
  basemap: {
    url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  label: {
    url: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  bounds: {
    bbox: null,
    options: {}, // fitBounds options
  },
};
