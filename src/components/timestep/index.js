import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import moment from 'moment';

// components
import Icon from 'components/icon';
import Slider from 'components/slider';
// import Datepicker from 'components/datepicker';

// styles
import './styles.scss';

class Timestep extends PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    handleTogglePlay: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    trim: PropTypes.number.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnAfterChange: PropTypes.func.isRequired,
    marks: PropTypes.shape({}).isRequired,
    formatValue: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    canPlay: PropTypes.bool.isRequired,
    customClass: PropTypes.string,
    range: PropTypes.bool,
    value: PropTypes.number,
    trackStyle: PropTypes.shape({}),
    railStyle: PropTypes.shape({}),
    trackColors: PropTypes.shape([]),
    handleStyle: PropTypes.shape({}),
  }

  static defaultProps = {
    range: true,
    value: null,
    customClass: null,
    trackColors: [],
    trackStyle: {},
    railStyle: {},
    handleStyle: {}
  }

  getValue() {
    const { range, canPlay, start, end, trim, value } = this.props;
    if (range) {
      return canPlay ? [start, end, trim] : [start, end];
    }
    return value;
  }

  render() {
    const {
      isPlaying,
      handleTogglePlay,
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
      trackColors,
      handleStyle,
      range
    } = this.props;

    const externalClass = classnames({ [customClass]: !!customClass });
    const sliderClass = classnames(
      'wri_api__range',
      { 'wri_api__can-play': canPlay }
    );
    const iconStatus = classnames({
      'icon-pause2': isPlaying,
      'icon-play3': !isPlaying
    });

    return (
      <div
        styleName="c-timestep"
        className={externalClass}
      >
        <div styleName="range-slider">
          {canPlay && (
            <button
              type="button"
              styleName="player-btn"
              onClick={handleTogglePlay}
            >
              <Icon name={iconStatus} />
            </button>
          )}

          <Slider
            range={range}
            className="wri_api__slider-timestep"
            customClass={sliderClass}
            marks={marks}
            disabled={isPlaying}
            min={min}
            max={max}
            value={this.getValue()}
            step={step}
            onChange={handleOnChange}
            onAfterChange={handleOnAfterChange}
            formatValue={formatValue}
            railStyle={railStyle}
            trackStyle={trackStyle}
            trackColors={trackColors}
            handleStyle={handleStyle}
            showTooltip={index => isPlaying && index === 1}
            pushable
          />

        </div>
      </div>
    );
  }
}

export default Timestep;
