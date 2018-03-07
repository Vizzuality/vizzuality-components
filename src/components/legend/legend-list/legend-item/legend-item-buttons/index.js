import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import CSSModules from 'react-css-modules';

// Components
import LegendItemButtonLayers from './legend-item-button-layers';
import LegendItemButtonOpacity from './legend-item-button-opacity';
import LegendItemButtonVisibility from './legend-item-button-visibility';
import LegendItemButtonInfo from './legend-item-button-info';
import LegendItemButtonRemove from './legend-item-button-remove';

// Styles
import styles from './styles.scss';

class LegendItemButtons extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    readonly: PropTypes.bool,
    interaction: PropTypes.bool
  }

  static defaultProps = {
    layers: [],
    readonly: false,
    interaction: true
  }

  /**
   * HELPERS
   * - getTimelineLayers
  */
  getTimelineLayers = () => {
    const { layers } = this.props;

    return sortBy(
      layers.filter(l => l.layerConfig.timeline),
      l => l.layerConfig.order
    );
  }

  render() {
    const { layers, readonly, interaction } = this.props;
    const timelineLayers = this.getTimelineLayers();

    return (
      <div styleName="c-legend-item-buttons">
        {/* MULTILAYER */}
        {layers.length > 1 && !timelineLayers.length && !readonly && (
          <LegendItemButtonLayers
            {...this.props}
          />
        )}

        {/* OPACITY */}
        {!readonly &&
          <LegendItemButtonOpacity
            {...this.props}
          />
        }

        {/* VISIBILITY */}
        {!readonly &&
          <LegendItemButtonVisibility
            {...this.props}
          />
        }

        {/* INFO */}
        {interaction &&
          <LegendItemButtonInfo
            {...this.props}
          />
        }

        {/* CLOSE */}
        {!readonly &&
          <LegendItemButtonRemove
            {...this.props}
          />
        }
      </div>
    );
  }
}

export default CSSModules(LegendItemButtons, styles, { allowMultiple: true });
