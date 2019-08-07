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
    trim: PropTypes.number,
    marks: PropTypes.shape({}).isRequired,
    step: PropTypes.number,
    speed: PropTypes.number,
    loop: PropTypes.bool,
    formatValue: PropTypes.func.isRequired,

    trackStyle: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])),
    railStyle: PropTypes.shape({}),
    handleStyle: PropTypes.shape({}),

    playing: PropTypes.bool,
    PlayButton: PropTypes.node,

    handleOnChange: PropTypes.func,
    handleOnAfterChange: PropTypes.func,
    handleOnPlay: PropTypes.func
  }

  static defaultProps = {
    customClass: null,
    range: true,
    pushable: 0,
    canPlay: false,

    trim: null,

    step: 1,
    speed: 100,
    loop: false,

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

    playing: undefined,
    PlayButton: null,

    handleOnChange: null,
    handleOnAfterChange: null,
    handleOnPlay: null
  }

  constructor(props) {
    super(props);
    const { playing, start, end, trim } = this.props;

    this.state = {
      playing,
      start,
      end,
      trim
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { playing: statePlaying, start: stateStart, end: stateEnd, trim: stateTrim } = this.state;
    const { playing: prevStatePlaying, start: prevStateStart, end: prevStateEnd, trim: prevStateTrim } = prevState;

    const { playing, start, end, trim } = this.props;
    const { playing: prevPropsPlaying, start: prevPropsStart, end: prevPropsEnd, trim: prevPropsTrim } = prevProps;

    if (playing !== prevPropsPlaying) {
      this.setState({ playing }) // eslint-disable-line
    }

    if ((statePlaying && statePlaying !== prevStatePlaying)) {
      this.startTimeline();
    } else if (!statePlaying && statePlaying !== prevStatePlaying) {
      this.stopTimeline();
    } else if (statePlaying && stateEnd !== prevStateEnd) {
      this.incrementTimeline();
    }

    if (start !== prevPropsStart && start !== stateStart && prevStateStart === stateStart) {
      this.setState({ // eslint-disable-line
        start,
        end: trim
      });
    }

    if (end !== prevPropsEnd && end !== stateEnd && prevStateEnd === stateEnd) {
      this.setState({ // eslint-disable-line
        end
      });
    }

    if (trim !== prevPropsTrim && trim !== stateTrim && prevStateTrim === stateTrim) {
      this.setState({ // eslint-disable-line
        trim,
        end: trim
      });
    }
  }

  componentWillUnmount() {
    if (this.interval) this.stopTimeline();
  }

  getValue() {
    const { start, end, trim } = this.state;
    const { range } = this.props;

    if (range) {
      return [start, end, trim];
    }

    return end;
  }

  getTrackStyle() {
    const { start, end, trim } = this.state;
    const { trackStyle } = this.props;

    if (Array.isArray(trackStyle)) {
      const diff = end - start;
      const diff2 = trim - end;
      let stringArr = [];

      return trackStyle.map((t, i) => {
        const { gradient } = t;

        if (gradient) {
          const stringKeys = Object.keys(gradient);

          // It could be better, no more neurons
          if (i === 0) {
            stringArr = stringKeys
              .filter((g, j) => {
                const next = stringKeys[j + 1] || g;
                const di = start - (g + next);

                return g >= di && g <= end;
              })

              .map((g, j) => {
                const first = j === 0;
                const perc = ((g - start) / diff) * 100;
                const index = stringKeys.findIndex(ix => ix === g);

                if (first) {
                  return `${gradient[g]}`;
                }
                return `${gradient[stringKeys[index - 1]]} ${perc}%, ${gradient[g]} ${perc}%`;
              })
          }

          // It could be better, no more neurons
          if (i === 1) {
            stringArr = stringKeys
              .filter((g, j) => {
                const last = stringKeys[j - 1] || g;
                const di = end - (g - last);

                return g > di && g <= trim;
              })

              .map((g, j) => {
                const first = j === 0;
                const perc = ((g - end) / diff2) * 100;
                const index = stringKeys.findIndex(ix => ix === g);

                if (first) {
                  return `${gradient[g]}`;
                }

                return `${gradient[stringKeys[index - 1]]} ${perc}%, ${gradient[g]} ${perc}%`;
              })
          }

          return {
            ...t,
            background: stringArr.length > 1 ? `linear-gradient(to right, ${stringArr.join(',')})` : stringArr.toString()
          }
        }

        return t;
      })
    }

    return trackStyle;
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
    const { loop } = this.props;
    const { trim } = this.state;
    this.stopTimeline();

    if (loop) {
      this.startTimeline();
    } else {
      this.setState({ playing: false, end: trim });
    }
  };

  checkRange = range => {
    const { playing, start, end, trim } = this.state;

    if (!Array.isArray(range)) {
      return [start, range, trim];
    }

    // If end is different from trim, and trim is different from current state
    if (!playing && range[1] !== range[2] && trim !== range[2]) {
      return [range[0], range[2], range[2]];
    }

    // If end is different from trim, and end is different from current state
    if (!playing && range[1] !== range[2] && end !== range[1]) {
      return [range[0], range[1], range[1]];
    }

    // If end is different from trim, and trim is different from current state
    if (!playing && trim !== range[0]) {
      return [range[0], range[2], range[2]];
    }

    return range;
  };

  handleOnChange = range => {
    const { handleOnChange } = this.props;
    const newRange = this.checkRange(range);

    this.setState({
      start: newRange[0],
      end: newRange[1],
      trim: newRange[2]
    });

    if (handleOnChange) handleOnChange(newRange);
  };

  /* eslint-disable-next-line */
  handleOnAfterChange = debounce(range => {
    const { handleOnAfterChange } = this.props;
    const newRange = this.checkRange(range);

    if (handleOnAfterChange) handleOnAfterChange(newRange);
  }, 50);

  handleTogglePlay = () => {
    const { handleOnPlay } = this.props;
    const { playing: statePlaying } = this.state;

    const p = !statePlaying;

    this.setState({ playing: p });

    if (handleOnPlay) handleOnPlay(p);

  };

  renderPlay() {
    const { playing: statePlaying } = this.state;

     const iconStatus = classnames({
      'icon-pause': statePlaying,
      'icon-play': !statePlaying
    });

    return (
      <button
        type="button"
        styleName="player-btn"
        className={classnames({
          "-playing": statePlaying
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
      railStyle,
      handleStyle,
      range,
      pushable,
      PlayButton
    } = this.props;

    const { playing } = this.state;

    return (
      <div
        styleName="c-timestep"
        className={customClass}
      >
        {canPlay && !PlayButton && this.renderPlay()}
        {canPlay && !!PlayButton && PlayButton}

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
            trackStyle={this.getTrackStyle()}
            handleStyle={handleStyle}
            showTooltip={index => (playing && index === 1)}
            pushable={pushable}
          />
        </div>
      </div>
    );
  }
}

export default Timestep;
