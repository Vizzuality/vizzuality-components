import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import Timestep from 'components/timestep';

import {
  addToDate,
  dateDiffInDays,
  formatDatePretty,
  formatDate,
  getTicks,
  getTimelineConfigFromLayer
} from './utils';

export class TimestepContainer extends PureComponent {
  handleOnAfterChange = debounce(range => {
    const { handleChange, activeLayer } = this.props;
    const newRange = this.checkRange(range);
    const formattedRange = this.formatRange([
      newRange[0],
      newRange[1],
      newRange[2]
    ]);
    handleChange(formattedRange, activeLayer);
  }, 50);

  timelineConfig = null

  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    activeLayer: PropTypes.shape({})
  }

  static defaultProps = { activeLayer: {} };

  constructor(props) {
    super(props);

    const { activeLayer } = props;
    const { layerConfig } = activeLayer;

    if ((layerConfig || {}).timeline_config) {
      this.timelineConfig = getTimelineConfigFromLayer(activeLayer);
      const { minDate, maxDate, startDate, endDate, trimEndDate } = this.timelineConfig;

      this.state = {
        isPlaying: false,
        min: 0,
        max: dateDiffInDays(maxDate, minDate),
        start: dateDiffInDays(startDate, minDate),
        end: dateDiffInDays(endDate, minDate),
        trim: dateDiffInDays(trimEndDate, minDate),
        loops: 0
      };

      const dates = {
        maxDate,
        minDate,
        startDate,
        endDate,
        trimEndDate
      };

      this.marks = getTicks(dates);
    }
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (!this.timelineConfig) return;

    const { isPlaying, end, loops, trim } = this.state;
    if (isPlaying && loops > 1 && end >= trim) {
      this.handleResetTimeline();
    } else if (isPlaying && isPlaying !== prevState.isPlaying) {
      this.startTimeline();
    } else if (!isPlaying && isPlaying !== prevState.isPlaying) {
      this.stopTimeline();
    } else if (isPlaying && !isEqual(end, prevState.end)) {
      this.incrementTimeline(this.state);
    }

    const { activeLayer: { timelineParams } } = this.props;
    const { activeLayer: { timelineParams: prevTimelineParams } } = this.props;
    const omitParams = ['startDate', 'startYear', 'startMonth', 'startDay', 'endDate', 'endYear', 'endMonth', 'endDay'];

    if (!isEqual(omit(timelineParams, omitParams), omit(prevTimelineParams, omitParams))) {
      console.info('newTimelineParams');
    }
  }

  componentWillUnmount() {
    if (this.interval) this.stopTimeline();
  }

  incrementTimeline = nextState => {
    const { speed, minDate, step, interval } = this.timelineConfig;
    const { start, end, trim } = nextState;

    this.interval = setTimeout(() => {
      const currentEndDate = moment(minDate).add(end, 'days');
      const { loops } = this.state;
      const newEndDate = moment(currentEndDate).add(step, interval);
      let newEndDays = moment(newEndDate).diff(minDate, 'days');

      if (end === trim) {
        newEndDays = start;
        this.setState({ loops: loops + 1 });
      } else if (newEndDays >= trim) {
        newEndDays = trim;
        this.setState({ loops: loops + 1 });
      }

      this.handleOnChange([start, newEndDays, trim]);
      this.handleOnAfterChange([start, newEndDays, trim]);
    }, speed);
  };

  startTimeline = () => { this.incrementTimeline(this.state); };

  stopTimeline = () => { clearInterval(this.interval); };

  handleResetTimeline = () => {
    this.handleTogglePlay();
    this.stopTimeline();
    this.setState({ loops: 0 });
  };

  handleTogglePlay = () => {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });
  };

  checkRange = range => {
    const { start, trim } = this.state;
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

  handleOnDateChange = (date, position) => {
    const { handleChange } = this.props;
    const { minDate, startDate, endDate, trimEndDate } = this.timelineConfig;
    const newRange = [startDate, endDate, trimEndDate];
    newRange[position] = date.format('YYYY-MM-DD');
    if (position) {
      newRange[position - 1] = date.format('YYYY-MM-DD');
    }
    handleChange(newRange);
    const mappedRange = newRange.map(d => moment(d).diff(minDate, 'days'));

    this.setState({
      start: mappedRange[0],
      end: mappedRange[1],
      trim: mappedRange[2]
    });
  };

  formatRange = range => {
    const { minDate } = this.timelineConfig;
    return range.map(r => formatDate(addToDate(minDate, r)));
  };

  formatDateString = value => {
    const { minDate, dateFormat } = this.timelineConfig;
    return formatDatePretty(addToDate(minDate, value), dateFormat);
  };

  render() {
    if (!this.timelineConfig) return null;

    return createElement(Timestep, {
      ...this.props,
      ...this.state,
      ...this.timelineConfig,
      marks: this.marks,
      startTimeline: this.startTimeline,
      stopTimeline: this.stopTimeline,
      handleTogglePlay: this.handleTogglePlay,
      handleOnChange: this.handleOnChange,
      handleOnAfterChange: this.handleOnAfterChange,
      formatDateString: this.formatDateString,
      handleOnDateChange: this.handleOnDateChange
    });
  }
}

export default TimestepContainer;
