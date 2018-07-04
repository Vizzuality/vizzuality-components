import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'components/tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonRemove extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    tooltipOpened: PropTypes.bool,

    // ACTIONS
    onRemoveLayer: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    tooltipOpened: false,

    // ACTIONS
    onRemoveLayer: () => {}
  }

  render() {
    const { activeLayer, tooltipOpened, theme } = this.props;
    const style = { ...styles, ...theme };

    return (
      <Tooltip
        overlay="Remove"
        overlayClassName="c-rc-tooltip -default"
        placement="top"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button
          type="button"
          className={cx(style.cLegendButton, style.close)}
          onClick={() => this.props.onRemoveLayer(activeLayer)}
          aria-label="Remove"
        >
          <Icon name="icon-cross" className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default LegendItemButtonRemove;
