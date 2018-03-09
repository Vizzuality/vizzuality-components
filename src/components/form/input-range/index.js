import React from 'react';
import CSSModules from 'react-css-modules';

// InputRange
import RInputRange from 'react-input-range';

// Styles
import styles from './styles.scss';

export class InputRange extends React.PureComponent {
  render() {
    return (
      <RInputRange
        {...this.props}
      />
    );
  }
}

export default CSSModules(InputRange, styles, { allowMultiple: true });
