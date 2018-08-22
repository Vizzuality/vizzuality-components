import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class LegendTypeChoropleth extends React.PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object
  }

  static defaultProps = {
    activeLayer: {}
  }

  render() {
    const { activeLayer } = this.props;
    const { legendConfig } = activeLayer;

    if (!legendConfig || legendConfig.type !== 'choropleth') {
      return null;
    }

    return (
      <ul styleName="c-legend-type-choropleth">
        {legendConfig.items.map(({ name, value, color }) => (
          <li key={`legend-choropleth-item-${name || value}`}>
            <div styleName="icon-choropleth" style={{ backgroundColor: color }} />
            <span styleName="name">
              {name || value}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default LegendTypeChoropleth;
