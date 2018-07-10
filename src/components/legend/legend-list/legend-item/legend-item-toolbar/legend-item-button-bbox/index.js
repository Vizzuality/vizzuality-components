import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

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

    onChangeBBox: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    tooltipOpened: false,

    onChangeBBox: () => {}
  }

  render() {
    const { activeLayer, tooltipOpened, theme } = this.props;

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
      >
        <button
          type="button"
          className={theme.cLegendButton}
          aria-label="Fit to bounds"
          onClick={() => this.props.onChangeBBox(activeLayer)}
        >
          <Icon name="icon-bbox" className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default themr('LegendItemButtonBBox', styles)(LegendItemButtonBBox);
