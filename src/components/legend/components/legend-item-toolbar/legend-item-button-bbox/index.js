import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'components/tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonBBox extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    tooltipOpened: PropTypes.bool,
    icon: PropTypes.string,
    focusStyle: PropTypes.object,
    defaultStyle: PropTypes.object,

    onChangeBBox: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    tooltipOpened: false,
    icon: '',
    focusStyle: {},
    defaultStyle: {},

    onChangeBBox: () => {}
  }

  state = {
    visible: false
  }

  render() {
    const { activeLayer, tooltipOpened, icon, focusStyle, defaultStyle } = this.props;
    const { visible } = this.state;
    if (activeLayer.layerConfig && !activeLayer.layerConfig.bbox) {
      return null;
    }

    return (
      <Tooltip
        overlay="Fit to bounds"
        overlayClassName="c-rc-tooltip -default"
        placement="top"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
        onVisibleChange={v => this.setState({ visible: v })}
        visible={visible}
      >
        <button
          type="button"
          styleName="c-legend-button"
          aria-label="Fit to bounds"
          onClick={() => this.props.onChangeBBox(activeLayer)}
        >
          <Icon name={icon || 'icon-bbox'} className="-small" style={visible ? focusStyle : defaultStyle} />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonBBox, styles, { allowMultiple: true });
