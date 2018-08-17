### Default
```js
initialState = { value: 100 };

<Range
  marks={{
    0: '0%',
    100: '100%'
  }}
  min={0}
  max={100}
  step={1}
  value={100}
  onAfterChange={o => setState({ value: o })}
/>
```
