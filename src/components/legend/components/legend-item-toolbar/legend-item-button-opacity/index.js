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
    className: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,
    enabledStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    tooltipText: PropTypes.string,

    onChangeOpacity: PropTypes.func,
    onTooltipVisibilityChange: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    visibility: true,
    tooltipOpened: false,
    icon: '',
    className: '',
    focusStyle: {},
    defaultStyle: {},
    enabledStyle: {},
    disabledStyle: {},
    tooltipText: '',

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
    const {
      layers,
      visibility,
      activeLayer,
      tooltipOpened,
      icon,
      className,
      enabledStyle,
      defaultStyle,
      disabledStyle,
      focusStyle,
      tooltipText,
      ...rest
    } = this.props;

    const { visibilityClick, visibilityHover } = this.state;
    const { opacity } = activeLayer;
    let iconStyle = visibility ? defaultStyle : disabledStyle;
    if (visibility && (visibilityHover || visibilityClick)) {
      iconStyle = focusStyle;
    }
    if (visibility && opacity < 1) iconStyle = enabledStyle;

    return (
      <Tooltip
        overlay={
          visibility && (
          <LegendOpacityTooltip
            layers={layers}
            activeLayer={activeLayer}
            onChangeOpacity={this.props.onChangeOpacity}
            {...rest}
          />
)}
        visible={visibility && visibilityClick}
        overlayClassName={`c-rc-tooltip ${classnames({ '-default': visibility })} ${className || ''}`}
        placement="top"
        trigger={['click']}
        onVisibleChange={this.onTooltipVisibilityChange}
        destroyTooltipOnHide
      >
        <Tooltip
          visible={visibilityHover && !visibilityClick && visibility}
          overlay={tooltipText || (`Opacity ${opacity ? `(${opacity * 100}%)` : ''}`)}
          overlayClassName="c-rc-tooltip -default"
          placement="top"
          onVisibleChange={v => this.setState({ visibilityHover: v })}
          destroyTooltipOnHide
          style={styles.tooltip}
        >
          <button
            type="button"
            styleName={`c-legend-button opacity ${classnames({ '-disabled': !visibility })}`}
            aria-label="Change opacity"
          >
            <Icon name={icon || 'icon-opacity'} className="-small" style={iconStyle} />
          </button>
        </Tooltip>

      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonOpacity, styles, { allowMultiple: true });
