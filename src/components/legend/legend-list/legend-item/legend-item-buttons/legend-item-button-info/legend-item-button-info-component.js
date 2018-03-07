import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'rc-tooltip/dist/rc-tooltip';

class LegendItemButtonInfo extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object.isRequired,
    onChangeInfo: PropTypes.func.isRequired
  }

  render() {
    const { activeLayer } = this.props;

    return (
      <Tooltip
        overlay="Info"
        overlayClassName="c-rc-tooltip -default"
        overlayStyle={{
          color: '#fff'
        }}
        placement="top"
        trigger={['hover', 'click']}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button
          type="button"
          className="info"
          aria-label="More information"
          onClick={() => this.props.onChangeInfo(activeLayer)}
        >
          <Icon name="icon-info" />
        </button>
      </Tooltip>
    );
  }
}

export default LegendItemButtonInfo;
