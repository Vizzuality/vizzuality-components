import React from 'react';
import CSSModules from 'react-css-modules';

// Range
import Slider from 'rc-slider';

// Styles
import styles from './styles.scss';

export class Range extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    return (
      <Slider
        {...this.props}
        value={this.state.value}
        onChange={value => { this.setState({ value }); }}
      />
    );
  }
}

export default CSSModules(Range, styles, { allowMultiple: true });
