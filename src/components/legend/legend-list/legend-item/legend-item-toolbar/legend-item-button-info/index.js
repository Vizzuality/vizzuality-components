import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

// Components
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonInfo extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    tooltipOpened: PropTypes.bool,

    // ACTIONS
    onChangeInfo: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    tooltipOpened: false,

    onChangeInfo: () => {}
  }

  render() {
    const { activeLayer, tooltipOpened, theme } = this.props;
    return (
      <Tooltip
        overlay="Layer info"
        overlayClassName="c-rc-tooltip -default"
        placement="top"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button
          type="button"
          className={theme.cLegendButton}
          aria-label="More information"
          onClick={() => this.props.onChangeInfo(activeLayer)}
        >
          <Icon name="icon-info" className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default themr('LegendItemButtonInfo', styles)(LegendItemButtonInfo);
