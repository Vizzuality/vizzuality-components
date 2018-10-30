import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider, { createSliderWithTooltip, Handle } from 'rc-slider';

// components
import Tooltip from 'components/tooltip';

const RangeRender = createSliderWithTooltip(Slider.Range);

class Range extends PureComponent {

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    range: PropTypes.bool,
    showTooltip: PropTypes.func,
    formatValue: PropTypes.func
  };

  static defaultProps = {
    value: 0,
    range: false,
    showTooltip: null,
    formatValue: null
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { value };
  }

  renderHandle = props => {
    const { formatValue, showTooltip } = this.props;
    const { value, dragging, index, ...restProps } = props;
    const formattedValue = formatValue ? formatValue(value) : value;
    const tooltipVisible = showTooltip ? showTooltip(index) : false;

    return (
      <Tooltip
        key={index}
        overlay={formattedValue}
        overlayClassName="c-rc-tooltip -default"
        overlayStyle={{ color: '#fff' }}
        placement="top"
        mouseLeaveDelay={0}
        destroyTooltipOnHide
        visible={dragging || tooltipVisible}
      >
        <Handle className="drag-handle" value={value} {...restProps} />
      </Tooltip>
    );
  }

  render() {
    const { value } = this.state;
    const { range } = this.props;
    const Component = range ? RangeRender : Slider;

    return (
      <Component
        trackStyle={[
          { backgroundColor: '#c32d7b' },
          { backgroundColor: 'grey' }
        ]}
        handleStyle={[
          { backgroundColor: '#c32d7b', width: '14px', height: '14px', border: 0 }
        ]}
        activeDotStyle={{ display: 'none' }}
        dotStyle={{ display: 'none' }}
        {...this.props}
        handle={this.renderHandle}
        value={value}
        onChange={v => this.setState({ value: v })}
        className="wri_api__slider-range"
      />
    );
  }
}

export default Range;
