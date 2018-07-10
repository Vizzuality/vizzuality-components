import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import styles from './styles.scss';

export class LegendTypeGradient extends React.PureComponent {
  static propTypes = {
    // Props
    activeLayer: PropTypes.object
  }

  static defaultProps = {
    // Props
    activeLayer: {}
  }

  render() {
    const { activeLayer, theme } = this.props;
    const { legendConfig } = activeLayer;

    if (!legendConfig || legendConfig.type !== 'proportional') {
      return null;
    }

    return (
      <ul className={theme.cLegendTypeProportional}>
        {legendConfig.items.map(({ name, color, size }) => (
          <li key={theme[`legendProportionalItem-${name}`]}>
            <div
              className={theme.iconProportional}
              style={{ backgroundColor: color, width: size, height: size }}
            />
            <span className={theme.name}>{name}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default themr('LegendTypeGradient', styles)(LegendTypeGradient);
