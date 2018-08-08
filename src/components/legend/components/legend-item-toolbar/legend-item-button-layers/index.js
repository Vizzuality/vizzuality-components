import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'components/tooltip';
import LegendLayersTooltip from './legend-item-button-layers-tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonLayers extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    activeLayer: PropTypes.object,
    icon: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,

    onChangeLayer: PropTypes.func,
    onTooltipVisibilityChange: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    icon: '',
    focusStyle: {},
    defaultStyle: {},

    onChangeLayer: () => {},
    onTooltipVisibilityChange: () => {}
  }

  state = {
    visibilityHover: false,
    visibilityClick: false,
    multiLayersActive: this.props.layers.length > 1
  }

  componentWillReceiveProps() {
    // XXX : Whenever the user fiddles with the legend, make sure to hide the multi layer popup
    if (this.state.multiLayersActive) {
      this.setState({ multiLayersActive: false });
    }
  }

  onTooltipVisibilityChange = (visibility) => {
    this.setState({ visibilityHover: false });
    this.setState({ visibilityClick: visibility });

    if (this.state.multiLayersActive) {
      this.setState({ multiLayersActive: false });
    }

    this.props.onTooltipVisibilityChange(visibility);
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
    const { layers, activeLayer, icon, focusStyle, defaultStyle } = this.props;
    const { visibilityClick, visibilityHover, multiLayersActive } = this.state;
    const timelineLayers = this.getTimelineLayers();

    if (layers.length === 1 || timelineLayers.length) {
      return null;
    }

    return (
      <Tooltip
        overlay={
          <LegendLayersTooltip
            layers={layers}
            activeLayer={activeLayer}
            onChangeLayer={this.props.onChangeLayer}
          />
        }
        overlayClassName="c-rc-tooltip -default -layers"
        placement="top"
        trigger={['click']}
        destroyTooltipOnHide
        onVisibleChange={this.onTooltipVisibilityChange}
      >

        <Tooltip
          visibile={(!visibilityClick && visibilityHover) || multiLayersActive}
          overlay={multiLayersActive ? `${layers.length} layers` : 'Layers'}
          overlayClassName="c-rc-tooltip -default"
          placement="top"
          onVisibleChange={visibility => this.setState({ visibilityHover: visibility })}
          destroyTooltipOnHide
          visible={visibilityHover && !visibilityClick}
        >
          <button
            type="button"
            styleName="c-legend-button layers"
            aria-label="Select other layer"
          >
            <Icon name={icon || 'icon-layers'} className="-small" style={visibilityHover || visibilityClick ? focusStyle : defaultStyle} />
          </button>
        </Tooltip>
      </Tooltip>

    );
  }
}

export default CSSModules(LegendItemButtonLayers, styles, { allowMultiple: true });
