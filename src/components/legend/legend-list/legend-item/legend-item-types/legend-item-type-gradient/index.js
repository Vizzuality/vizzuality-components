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

    if (!legendConfig || legendConfig.type !== 'gradient') {
      return null;
    }

    const items = legendConfig.items.filter(item => item.color !== 'transparent');
    const itemTransparent = legendConfig.items.find(item => item.color === 'transparent');
    const gradient = items.map(item => item.color);

    return (
      <div className={theme.cLegendTypeGradient}>
        <div className={theme.legendGradientIcon}>
          {itemTransparent &&
            <div
              style={{ width: `${(1 / legendConfig.items.length) * 100}%` }}
              className={theme.iconGradientTransparent}
            />
          }
          <div
            className={theme.iconGradient}
            style={{
              width: `${(items.length / legendConfig.items.length) * 100}%`,
              backgroundImage: `linear-gradient(to right, ${gradient.join(',')})`
            }}
          />
        </div>
        <ul>
          {legendConfig.items.map(({ name, color, value }) => (
            <li key={`legendGradientItem-${color}-${value}-${name}`}>
              <span className={theme.name}>{name || value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default themr('LegendTypeGradient', styles)(LegendTypeGradient);
