### Default slider

```js

initialState = { value: 50 };

<Slider
  min={0}
  max={100}
  value={state.value}
  onChange={(value) => { setState({ value }); }}
/>
```

### Range slider


```js

initialState = { value: [25, 75] };

<Slider
  min={0}
  max={100}
  range
  value={state.value}
  onChange={(value) => { setState({ value }); }}
/>
```
