### Components available
<pre>
import { Map } from 'wri-api-components';
</pre>

### Full legend
```jsx
<Map
  events={{
    zoomend: (e, map) => { console.info(e, map); },
    dragend: (e, map) => { console.info(e, map); }
  }}  
>
</Map>
```