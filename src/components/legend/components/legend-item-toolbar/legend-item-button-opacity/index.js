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
    visibility: PropTypes.bool,
    tooltipOpened: PropTypes.bool,
    icon: PropTypes.string,
    color: PropTypes.string,

    onChangeOpacity: PropTypes.func,
    onTooltipVisibilityChange: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    visibility: true,
    tooltipOpened: false,
    icon: '',
    color: null,

    onChangeOpacity: () => {},
    onTooltipVisibilityChange: () => {}
  }

  state = {
    visibilityHover: false,
    visibilityClick: false
  }

  onTooltipVisibilityChange = (visibility) => {
    this.setState({ visibilityHover: false });
    this.setState({ visibilityClick: visibility });
    this.props.onTooltipVisibilityChange(visibility);
  }

  render() {
    const { layers, visibility, activeLayer, tooltipOpened, icon, color } = this.props;
    const { visibilityClick, visibilityHover } = this.state;

    return (
      <Tooltip
        overlay={
          visibility &&
            <LegendOpacityTooltip
              layers={layers}
              activeLayer={activeLayer}
              onChangeOpacity={this.props.onChangeOpacity}
              color={color}
            />
        }
        overlayClassName={`c-rc-tooltip ${classnames({ '-default': visibility })} -opacity`}
        placement="top"
        trigger={['click']}
        onVisibilityChange={this.onTooltipVisibilityChange}
        destroyTooltipOnHide
      >
        <Tooltip
          visibility={!visibilityClick && visibilityHover}
          overlay="Opacity"
          overlayClassName="c-rc-tooltip -default"
          placement="top"
          trigger={tooltipOpened ? '' : 'hover'}
          onVisibilityChange={v => this.setState({ visibilityHover: v })}
          destroyTooltipOnHide
        >
          <button
            type="button"
            styleName={`c-legend-button opacity ${classnames({ '-disabled': !visibility })}`}
            aria-label="Change opacity"
          >
            <Icon name={icon || 'icon-opacity'} className="-small" />
          </button>
        </Tooltip>

      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonOpacity, styles, { allowMultiple: true });
