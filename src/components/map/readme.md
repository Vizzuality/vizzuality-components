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