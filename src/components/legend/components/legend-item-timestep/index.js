import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    defaultStyles: PropTypes.shape({}),
    activeLayer: PropTypes.shape({}),
    handleChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    defaultStyles: {},
    activeLayer: {}
  };

  constructor(props) {
    super(props);
    const { activeLayer } = props;
    const { timelineParams } = activeLayer;

    this.timelineParams = timelineParams;
  }

  handleOnChange = range => {
    const { activeLayer, handleChange } = this.props;
    const formattedRange = this.formatRange([
      range[0],
      range[1],
      range[2]
    ]);

    handleChange(formattedRange, activeLayer);
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
    const { defaultStyles } = this.props;
    const { marks, maxDate, minDate, interval, startDate, endDate, trimEndDate } = this.timelineParams;

    return (
      <div styleName="c-legend-timestep">
        <Timestep
          {...this.props}
          {...defaultStyles}
          {...this.timelineParams}
          min={0}
          max={dateDiff(maxDate, minDate, interval)}
          start={dateDiff(startDate, minDate, interval)}
          end={dateDiff(endDate, minDate, interval)}
          trim={dateDiff(trimEndDate, minDate, interval)}
          marks={marks || getTicks(this.timelineParams)}
          formatValue={this.formatValue}
          handleOnChange={this.handleOnChange}
        />
      </div>
    )
  }
}

export default TimestepContainer;
