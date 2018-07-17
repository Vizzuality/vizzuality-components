import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

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
    icon: PropTypes.string,

    // ACTIONS
    onRemoveLayer: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    tooltipOpened: false,
    icon: '',

    // ACTIONS
    onRemoveLayer: () => {}
  }

  render() {
    const { activeLayer, tooltipOpened, icon } = this.props;

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
          styleName="c-legend-button close"
          onClick={() => this.props.onRemoveLayer(activeLayer)}
          aria-label="Remove"
        >
          <Icon name={icon || 'icon-cross'} className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonRemove, styles, { allowMultiple: true });
