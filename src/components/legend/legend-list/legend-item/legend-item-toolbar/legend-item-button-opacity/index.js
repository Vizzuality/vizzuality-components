import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'components/tooltip';
import LegendOpacityTooltip from './legend-item-button-opacity-tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonOpacity extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    activeLayer: PropTypes.object,
    visible: PropTypes.bool,
    tooltipOpened: PropTypes.bool,

    onChangeOpacity: PropTypes.func,
    onTooltipVisibilityChange: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    visible: true,
    tooltipOpened: false,

    onChangeOpacity: () => {},
    onTooltipVisibilityChange: () => {}
  }

  state = {
    visibilityHover: false,
    visibilityClick: false
  }

  onTooltipVisibilityChange = (visible) => {
    this.setState({ visibilityHover: false });
    this.setState({ visibilityClick: visible });
    this.props.onTooltipVisibilityChange(visible);
  }

  render() {
    const { layers, visible, activeLayer, tooltipOpened } = this.props;
    const { visibilityClick, visibilityHover } = this.state;

    return (
      <Tooltip
        overlay={
          visible &&
            <LegendOpacityTooltip
              layers={layers}
              activeLayer={activeLayer}
              onChangeOpacity={this.props.onChangeOpacity}
            />
        }
        overlayClassName={`c-rc-tooltip ${classnames({ '-default': visible })}`}
        placement="top"
        trigger={['click']}
        onVisibleChange={this.onTooltipVisibilityChange}
        destroyTooltipOnHide
      >
        <Tooltip
          visible={!visibilityClick && visibilityHover}
          overlay="Opacity"
          overlayClassName={`c-rc-tooltip ${classnames({ '-default': visible })}`}
          placement="top"
          trigger={tooltipOpened ? '' : 'hover'}
          onVisibleChange={v => this.setState({ visibilityHover: v })}
          destroyTooltipOnHide
        >
          <button
            type="button"
            styleName={`c-legend-button opacity ${classnames({ '-disabled': !visible })}`}
            aria-label="Change opacity"
          >
            <Icon name="icon-opacity" className="-small" />
          </button>
        </Tooltip>

      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonOpacity, styles, { allowMultiple: true });
