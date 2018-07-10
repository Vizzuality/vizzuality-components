import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'components/tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonVisibility extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    visible: PropTypes.bool,
    tooltipOpened: PropTypes.bool,
    onChangeVisibility: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    visible: true,
    tooltipOpened: false,
    onChangeVisibility: () => {}
  }

  render() {
    const { activeLayer, visible, tooltipOpened, theme } = this.props;

    return (
      <Tooltip
        overlay="Visibility"
        overlayClassName="c-rc-tooltip -default"
        placement="top"
        trigger={tooltipOpened ? '' : 'hover'}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button
          type="button"
          className={cx(theme.cLegendButton, theme.toggle)}
          onClick={() => this.props.onChangeVisibility(activeLayer, !visible)}
          aria-label="Toggle the visibility"
        >
          <Icon name={visible ? 'icon-hide' : 'icon-show'} className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default themr('LegendItemButtonVisibility', styles)(LegendItemButtonVisibility);
