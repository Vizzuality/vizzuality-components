import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import styles from './styles.scss';

export class LegendTypeChoropleth extends React.PureComponent {
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

    if (!legendConfig || legendConfig.type !== 'choropleth') {
      return null;
    }

    return (
      <ul className={theme.cLegendTypeChoropleth}>
        {legendConfig.items.map(({ name, value, color }) => (
          <li key={`legend-choropleth-item-${name || value}`}>
            <div className={theme.iconChoropleth} style={{ backgroundColor: color }} />
            <span className={theme.name}>{name || value}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default themr('LegendTypeChoropleth', styles)(LegendTypeChoropleth);
