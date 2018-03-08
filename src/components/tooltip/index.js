import React from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';

// Tooltip
import RCTooltip from 'rc-tooltip/dist/rc-tooltip';

// Styles
import styles from './styles.scss';

export class Tooltip extends React.PureComponent {
  static propTypes = {
    // Props
    children: PropTypes.node
  };

  static defaultProps = {
    // Props
    children: []
  };

  render() {
    return (
      <RCTooltip
        {...this.props}
      >
        {this.props.children}
      </RCTooltip>
    );
  }
}

export default CSSModules(Tooltip, styles, { allowMultiple: true });
