import React from 'react';
import CSSModules from 'react-css-modules';

// Range
import Slider from 'rc-slider';

// Styles
import styles from './styles.scss';

export class Range extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    const { color } = this.props;
    return (
      <Slider
        trackStyle={[
          { backgroundColor: color || '#c32d7b' },
          { backgroundColor: 'grey' }
        ]}
        handleStyle={[
          { backgroundColor: color || '#c32d7b', width: '14px', height: '14px', border: 0 }
        ]}
        activeDotStyle={{ display: 'none' }}
        dotStyle={{ display: 'none' }}
        {...this.props}
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

export default CSSModules(Range, styles, { allowMultiple: true });
