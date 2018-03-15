import React from 'react';
import CSSModules from 'react-css-modules';

// Range
import RRange from 'react-input-range';

// Styles
import styles from './styles.scss';

export class Range extends React.PureComponent {
  render() {
    return (
      <RRange
        {...this.props}
      />
    );
  }
}

export default CSSModules(Range, styles, { allowMultiple: true });
