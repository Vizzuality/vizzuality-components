### Default
```js
initialState = { value: 100 };

<InputRange
  minValue={0}
  maxValue={100}
  step={1}
  value={state.value}
  formatLabel={(v, string) => {
    if (string === 'value') {
      return null;
    }

    return v.toFixed(2);
  }}
  onChange={o => setState({ value: o })}
/>
```
