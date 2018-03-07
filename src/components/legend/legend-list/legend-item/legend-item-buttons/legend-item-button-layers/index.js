import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import LegendLayersTooltip from './legend-item-button-layers-tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonLayers extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    activeLayer: PropTypes.object,

    onChangeLayer: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},

    onChangeLayer: () => {}
  }

  render() {
    const { layers, activeLayer } = this.props;

    return (
      <Tooltip
        overlay={
          <LegendLayersTooltip
            layers={layers}
            activeLayer={activeLayer}
            onChangeLayer={this.props.onChangeLayer}
          />
        }
        overlayClassName="c-rc-tooltip -default"
        overlayStyle={{
          color: '#fff'
        }}
        placement="top"
        trigger={['hover', 'click']}
        destroyTooltipOnHide
      >
        <button
          type="button"
          styleName="c-legend-button layers"
          aria-label="Select other layer"
        >
          <Icon name="icon-layers" className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonLayers, styles, { allowMultiple: true });
