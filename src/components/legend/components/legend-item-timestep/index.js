import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import Timestep from 'components/timestep';

import {
  addToDate,
  dateDiff,
  formatDatePretty,
  formatDate,
  getTicks
} from './utils';

import './styles.scss';

export class TimestepContainer extends PureComponent {
  timelineParams = null

  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    activeLayer: PropTypes.shape({})
  }

  static defaultProps = { activeLayer: {} };

  constructor(props) {
    super(props);

    const { activeLayer } = props;
    const { timelineParams } = activeLayer;

    if (timelineParams) {
      this.timelineParams = timelineParams;
      const { minDate, maxDate, startDate, endDate, trimEndDate, interval } = this.timelineParams;

      this.state = {
        playing: false,
        min: 0,
        max: dateDiff(maxDate, minDate, interval),
        start: dateDiff(startDate, minDate, interval),
        end: dateDiff(endDate, minDate, interval),
        trim: dateDiff(trimEndDate, minDate, interval),
        marks: getTicks(this.timelineParams)
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.timelineParams) return;

    const { playing, end } = this.state;

    if (playing && playing !== prevState.playing) {
      this.startTimeline();
    } else if (!playing && playing !== prevState.playing) {
      this.stopTimeline();
    } else if (playing && !isEqual(end, prevState.end)) {
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

  startTimeline = () => {
    const { start, end, trim } = this.state;

    this.setState({ end: (end >= trim) ? start : end }, () => {
      this.incrementTimeline();
    });
  };

  stopTimeline = () => { clearInterval(this.interval); };

  incrementTimeline = () => {
    const { speed, minDate, step, interval } = this.timelineParams;
    const { start, end, trim } = this.state;

    this.interval = setTimeout(() => {
      const endDate = moment(minDate).add(end, interval);
      const newEndDate = moment(endDate).add(step, interval);
      let newEnd = moment(newEndDate).diff(minDate, interval);

      this.handleOnChange([start, newEnd, trim]);
      this.handleOnAfterChange([start, newEnd, trim]);

      if (newEnd > trim) {
        newEnd = trim;
        this.handleResetTimeline();
      }
    }, speed);
  };

  handleResetTimeline = () => {
    const { trim } = this.state;
    this.stopTimeline();
    this.setState({ playing: false, end: trim });
  };

  handleTogglePlay = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  };

  handleOnChange = range => {
    const newRange = this.checkRange(range);

    this.setState({
      start: newRange[0],
      end: newRange[1],
      trim: newRange[2]
    });
  };

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

  formatRange = range => {
    const { minDate, interval } = this.timelineParams;
    return range.map(r => formatDate(addToDate(minDate, r, interval)));
  };

  formatValue = value => {
    const { minDate, dateFormat, interval } = this.timelineParams;
    return formatDatePretty(addToDate(minDate, value, interval), dateFormat);
  };

  render() {
    if (!this.timelineParams) return null;

    const { marks } = this.state;

    return (
      <Timestep
        {...this.props}
        {...this.state}
        {...this.timelineParams}
        marks={marks}
        formatValue={this.formatValue}
        handleTogglePlay={this.handleTogglePlay}
        handleOnChange={this.handleOnChange}
        handleOnAfterChange={this.handleOnAfterChange}
      />
    )
  }
}

export default TimestepContainer;
