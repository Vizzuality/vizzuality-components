### Timestep

Based on rc-slider, for more configuration, take a look at the offical [documentation](http://react-component.github.io/slider/)

```js
<Timestep
  isPlaying={true}
  canPlay={Boolean}

  handleTogglePlay={callback}
  handleOnChange={callback}
  handleOnAfterChange={callback}
  formatValue={callback}

  min={Number}
  max={Number}
  start={Number}
  end={Number}
  trim={Number}

  marks={{} || Array}
  step={Number}
  customClass={String}
  trackStyles={Object}
/>
```

You can pass your custom play button down as a react component using the `playButton` property.

```js
<Timestep
  playButton={(
    <button
      type="button"
      onClick={this.togglePlay}
      className="my_play_button"
    >
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  )}
/>
```
