import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import LegendLayersTooltip from './legend-item-button-layers-tooltip';
import '../styles-button.scss';

class LegendItemButtonLayers extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    activeLayer: PropTypes.object,
    icon: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,
    tooltipText: PropTypes.string,
    dataset: PropTypes.string.isRequired,

    onChangeLayer: PropTypes.func,
    onTooltipVisibilityChange: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    icon: '',
    focusStyle: {},
    defaultStyle: {},
    tooltipText: null,

    onChangeLayer: () => {},
    onTooltipVisibilityChange: () => {}
  }

  state = {
    visibilityHover: false,
    visibilityClick: false,
    multiLayersActive: this.props.layers.length > 1
  }

  componentWillReceiveProps() {
    const { multiLayersActive } = this.state;
    // XXX : Whenever the user fiddles with the legend, make sure to hide the multi layer popup
    if (multiLayersActive) {
      this.setState({ multiLayersActive: false });
    }
  }

  onTooltipVisibilityChange = (visibility) => {
    const { onTooltipVisibilityChange } = this.props;
    const { multiLayersActive } = this.state;
    this.setState({ visibilityHover: false });
    this.setState({ visibilityClick: visibility });

    if (multiLayersActive) {
      this.setState({ multiLayersActive: false });
    }

    onTooltipVisibilityChange(visibility);
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
    const {
      layers, activeLayer, icon,
      focusStyle, defaultStyle, tooltipText,
      onChangeLayer, dataset
    } = this.props;
    const { visibilityClick, visibilityHover, multiLayersActive } = this.state;
    const timelineLayers = this.getTimelineLayers();

    if (layers.length === 1 || timelineLayers.length) {
      return null;
    }


    return (
      <div id={`layer-${dataset}-item`}>
        <Tooltip
          overlay={(
            <LegendLayersTooltip
              layers={layers}
              activeLayer={activeLayer}
              onChangeLayer={onChangeLayer}
            />
          )}
          overlayClassName="c-rc-tooltip -default -layers"
          placement="top"
          trigger={['click']}
          destroyTooltipOnHide
          onVisibleChange={this.onTooltipVisibilityChange}
        >
          <Tooltip
            visible={multiLayersActive || (!visibilityClick && visibilityHover)}
            overlay={tooltipText || (multiLayersActive ? `${layers.length} layers` : 'Layers')}
            overlayClassName="c-rc-tooltip -default"
            placement="top"
            onVisibleChange={visibility => this.setState({ visibilityHover: visibility, multiLayersActive: false })}
            destroyTooltipOnHide
            getTooltipContainer={() => document.getElementById(`layer-${dataset}-item`)}
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
      </div>
    );
  }
}

export default LegendItemButtonLayers;
