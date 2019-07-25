import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Icon from 'components/icon';
import Slider from 'components/slider';

// styles
import './styles.scss';

class Timestep extends PureComponent {
  static propTypes = {
    customClass: PropTypes.string,
    range: PropTypes.bool,
    pushable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    canPlay: PropTypes.bool,
    playing: PropTypes.bool,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    trim: PropTypes.number.isRequired,
    marks: PropTypes.shape({}).isRequired,
    step: PropTypes.number.isRequired,
    formatValue: PropTypes.func.isRequired,
    value: PropTypes.number,

    trackStyle: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    railStyle: PropTypes.shape({}),
    handleStyle: PropTypes.shape({}),
    playButton: PropTypes.shape({}),

    handleTogglePlay: PropTypes.func,
    handleOnChange: PropTypes.func.isRequired,
    handleOnAfterChange: PropTypes.func,
  }

  static defaultProps = {
    range: true,
    pushable: 0,
    playing: false,
    canPlay: false,
    value: null,
    customClass: null,
    trackStyle: {
      backgroundColor: '#c32d7b',
      borderRadius: '0px'
    },
    railStyle: { backgroundColor: '#d9d9d9' },
    handleStyle: {
      backgroundColor: '#c32d7b',
      borderRadius: '10px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
      border: '0px',
      zIndex: 2
    },
    playButton: null,
    handleTogglePlay: () => {},
    handleOnAfterChange: () => {}
  }

  getValue() {
    const { range, canPlay, start, end, trim, value } = this.props;
    if (range) {
      return canPlay ? [start, end, trim] : [start, end];
    }
    return value;
  }

  playButton() {
    const { handleTogglePlay, playing, playButton } = this.props;

     if (playButton) {
      return playButton;
    }

     const iconStatus = classnames({
      'icon-pause2': playing,
      'icon-play3': !playing
    });

    return (
      <button
        type="button"
        styleName="player-btn"
        onClick={handleTogglePlay}
      >
        <Icon name={iconStatus} />
      </button>
    )
  }

  render() {
    const {
      playing,
      min,
      max,
      handleOnChange,
      handleOnAfterChange,
      marks,
      formatValue,
      step,
      canPlay,
      customClass,
      trackStyle,
      railStyle,
      handleStyle,
      range,
      pushable
    } = this.props;

    return (
      <div
        styleName="c-timestep"
        className={customClass}
      >
        {canPlay && this.playButton()}
        <div styleName={classnames('timestep-slider', { 'can-play': canPlay })}>
          <Slider
            range={range}
            marks={marks}
            disabled={playing}
            min={min}
            max={max}
            value={this.getValue()}
            step={step}
            onChange={handleOnChange}
            onAfterChange={handleOnAfterChange}
            formatValue={formatValue}
            railStyle={railStyle}
            trackStyle={trackStyle}
            handleStyle={handleStyle}
            showTooltip={index => playing && index === 1}
            pushable={pushable}
          />
        </div>
      </div>
    );
  }
}

export default Timestep;
