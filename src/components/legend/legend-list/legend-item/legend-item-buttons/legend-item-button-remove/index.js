import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'rc-tooltip/dist/rc-tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonRemove extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,

    // ACTIONS
    onRemoveLayer: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},

    // ACTIONS
    onRemoveLayer: () => {}
  }

  render() {
    const { activeLayer } = this.props;

    return (
      <Tooltip
        overlay="Remove"
        overlayClassName="c-rc-tooltip -default"
        overlayStyle={{ color: '#fff' }}
        placement="top"
        trigger={['hover', 'click']}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button
          type="button"
          styleName="c-legend-button close"
          onClick={() => this.props.onRemoveLayer(activeLayer)}
          aria-label="Remove"
        >
          <Icon name="icon-cross" className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonRemove, styles, { allowMultiple: true });
