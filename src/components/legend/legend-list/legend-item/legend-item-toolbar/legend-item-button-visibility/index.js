import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'rc-tooltip/dist/rc-tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonVisibility extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    visible: PropTypes.bool,
    onChangeVisibility: PropTypes.func
  }

  static defaultProps = {
    activeLayer: {},
    visible: true,
    onChangeVisibility: () => {}
  }

  render() {
    const { activeLayer, visible } = this.props;

    return (
      <Tooltip
        overlay="Visibility"
        overlayClassName="c-rc-tooltip -default"
        overlayStyle={{ color: '#fff' }}
        placement="top"
        trigger={['hover', 'click']}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button
          type="button"
          styleName="c-legend-button toggle"
          onClick={() => this.props.onChangeVisibility(activeLayer, !visible)}
          aria-label="Toggle the visibility"
        >
          <Icon name={visible ? 'icon-hide' : 'icon-show'} className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonVisibility, styles, { allowMultiple: true });
