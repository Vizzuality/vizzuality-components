import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

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
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    trim: PropTypes.number.isRequired,
    marks: PropTypes.shape({}).isRequired,
    step: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    formatValue: PropTypes.func.isRequired,

    trackStyle: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    railStyle: PropTypes.shape({}),
    handleStyle: PropTypes.shape({}),
    playButton: PropTypes.shape({}),

    handleOnChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    range: true,
    pushable: 0,
    canPlay: false,
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
    playButton: null
  }

  constructor(props) {
    super(props);
    const { start, end, trim } = this.props;

    this.state = {
      playing: false,
      start,
      end,
      trim
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { playing, start: stateStart, end: stateEnd, trim: stateTrim } = this.state;
    const { start: prevStateStart, end: prevStateEnd, trim: prevStateTrim } = prevState;

    const { start, end, trim } = this.props;
    const { start: prevPropsStart, end: prevPropsEnd, trim: prevPropsTrim } = prevProps;

    if (playing && playing !== prevState.playing) {
      this.startTimeline();
    } else if (!playing && playing !== prevState.playing) {
      this.stopTimeline();
    } else if (playing && stateEnd !== prevState.end) {
      this.incrementTimeline();
    }

    if (!playing && start !== prevPropsStart && start !== stateStart && prevStateStart === stateStart) {
      this.setState({ start }); // eslint-disable-line
    }

    if (!playing && end !== prevPropsEnd && end !== stateEnd && prevStateEnd === stateEnd) {
      this.setState({ end }); // eslint-disable-line
    }

    if (!playing && trim !== prevPropsTrim && trim !== stateTrim && prevStateTrim === stateTrim) {
      this.setState({ trim }); // eslint-disable-line
    }
  }

  componentWillUnmount() {
    if (this.interval) this.stopTimeline();
  }

  getValue() {
    const { start, end, trim } = this.state;
    const { range, canPlay } = this.props;

    if (range) {
      return canPlay ? [start, end, trim] : [start, end];
    }

    return end;
  }

  startTimeline = () => {
    const { start, end, trim } = this.state;
    if (end < trim) {
      this.incrementTimeline();
    } else if (end >= trim) {
      this.setState({ end: start }, () => {
        this.incrementTimeline();
      });
    }
  };

  stopTimeline = () => { clearInterval(this.interval); };

  incrementTimeline = () => {
    const { start, end, trim } = this.state;
    const { speed, step, range, max } = this.props;

    this.interval = setTimeout(() => {
      const newEnd = end + step;

      if ((newEnd > trim && range) || (!range && newEnd > max)) {
        this.handleResetTimeline();
      } else {
        this.handleOnChange([start, newEnd, trim]);
        this.handleOnAfterChange([start, newEnd, trim]);
      }
    }, speed);
  };

  handleResetTimeline = () => {
    const { trim } = this.state;
    this.stopTimeline();
    this.setState({ playing: false, end: trim });
  };

  checkRange = range => {
    const { start, trim } = this.state;
    if (!Array.isArray(range)) {
      return [start, range, trim];
    }

    if (
      (range[2] && range[0] !== start) ||
      (range[2] && range[2] !== trim)
    ) {
      return [range[0], range[2], range[2]];
    }
    return range;
  };

  handleOnChange = range => {
    const newRange = this.checkRange(range);

    this.setState({
      start: newRange[0],
      end: newRange[1],
      trim: newRange[2]
    });
  };

  /* eslint-disable-next-line */
  handleOnAfterChange = debounce(range => {
    const { handleOnChange } = this.props;
    const newRange = this.checkRange(range);

    handleOnChange(newRange);
  }, 50);

  handleTogglePlay = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  };

  playButton() {
    const { playButton } = this.props;
    const { playing } = this.state;

     if (playButton) {
      return playButton;
    }

     const iconStatus = classnames({
      'icon-pause': playing,
      'icon-play': !playing
    });

    return (
      <button
        type="button"
        styleName="player-btn"
        className={classnames({
          "-playing": playing
        })}
        onClick={this.handleTogglePlay}
      >
        <Icon name={iconStatus} />
      </button>
    )
  }

  render() {
    const {
      min,
      max,
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
    const { playing } = this.state;

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
            onChange={this.handleOnChange}
            onAfterChange={this.handleOnAfterChange}
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
