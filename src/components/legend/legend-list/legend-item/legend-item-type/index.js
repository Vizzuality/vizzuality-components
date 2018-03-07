import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Styles
import styles from './styles.scss';

class LegendItemType extends React.Component {
  static propTypes = {
    // PROPS
    activeLayer: PropTypes.object
  };

  static defaultProps = {
    // PROPS
    activeLayer: {}
  };

  getLegendItemType() {
    const { activeLayer } = this.props;

    switch (activeLayer.legendConfig.type) {
      case 'basic': {
        const { items } = activeLayer.legendConfig;

        return (
          <div styleName={`type -${activeLayer.legendConfig.type}`}>
            <div styleName="type-list">
              {items.map(item => (
                <div styleName="type-list-item" key={`type-list-item-${item.value || item.name}`}>
                  <span styleName="color" style={{ background: item.color }} />
                  <span styleName="name">{item.name || item.value}{activeLayer.legendConfig.unit}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'gradient': {
        const { items } = activeLayer.legendConfig;
        // Gradient & values
        const gradient = items.map(item => item.color);
        const values = [items[0], items[items.length - 1]];

        return (
          <div styleName={`type -${activeLayer.legendConfig.type}`}>
            <div styleName="type-list">
              <div styleName="type-list-item" style={{ width: '100%', backgroundImage: `linear-gradient(to right, ${gradient.join(',')})` }}>
                <span styleName="color" />
              </div>
            </div>
            <div styleName="type-list">
              {values.map(item => (
                <div styleName="type-list-item" key={`type-list-item-${item.value || item.name}`}>
                  <span styleName="value">{item.value || item.name}{activeLayer.legendConfig.unit}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }


      case 'choropleth': {
        return (
          <div styleName={`type -${activeLayer.legendConfig.type}`}>
            <div styleName="type-list">
              {activeLayer.legendConfig.items.map(item => (
                <div
                  styleName="type-list-item"
                  style={{ width: `${100 / activeLayer.legendConfig.items.length}%` }}
                  key={`type-list-item-${item.name || item.value}`}
                >
                  <span styleName="color" style={{ background: item.color }} />
                </div>
              ))}
            </div>
            <div styleName="type-list">
              {activeLayer.legendConfig.items.map(item => (
                <div
                  styleName="type-list-item"
                  style={{ width: `${100 / activeLayer.legendConfig.items.length}%` }}
                  key={`type-list-item-${item.name || item.value}`}
                >
                  <span styleName="value">{item.value || item.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        console.warn('No legend type specified');
        return null;
    }
  }

  render() {
    return (
      <div styleName="c-legend-type">
        {this.getLegendItemType()}
      </div>
    );
  }
}

export default CSSModules(LegendItemType, styles, { allowMultiple: true });
