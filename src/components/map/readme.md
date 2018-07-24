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
import { Map } from 'wri-api-components';
</pre>

### Full legend
```jsx
<Map
  bounds={{
    bbox: [20, 50, 21, 51]
  }}
  events={{
    zoomend: (e, map) => { console.info(e, map); },
    dragend: (e, map) => { console.info(e, map); }
  }}  
>
</Map>
```