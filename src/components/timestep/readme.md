### Timestep

Based on rc-slider, for more configuration, take a look at the offical [documentation](http://react-component.github.io/slider/)

```js

initialState = {
  start: 25,
  end: 50,
  trim: 75
};

<Timestep
  canPlay={true}
  formatValue={value => `${value}%`}
  min={0}
  max={100}
  start={state.start}
  end={state.end}
  trim={state.trim}
  step={1}
  speed={500}
  handleOnChange={values => { setState({ start: values[0], end: values[1], trim: values[2] })}}
/>
```
