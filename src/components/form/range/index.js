import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/dist/rc-slider.css';
import './styles.scss';

class Range extends PureComponent {
  static propTypes = {
    value: PropTypes.number
  };

  static defaultProps = {
    value: 0
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { value };
  }

  render() {
    const { value } = this.state;
    return (
      <Slider
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
        value={value}
        onChange={v => this.setState({ value: v })}
      />
    );
  }
}

export default Range;
