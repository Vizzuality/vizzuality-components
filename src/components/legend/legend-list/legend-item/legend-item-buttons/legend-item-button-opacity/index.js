import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

// Components
import Icon from 'components/icon';

// Tooltip
import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import LegendOpacityTooltip from './legend-item-button-opacity-tooltip';

// Styles
import styles from '../styles-button.scss';

class LegendItemButtonOpacity extends PureComponent {
  static propTypes = {
    layers: PropTypes.array,
    activeLayer: PropTypes.object,
    visible: PropTypes.bool,

    onChangeOpacity: PropTypes.func
  }

  static defaultProps = {
    layers: [],
    activeLayer: {},
    visible: true,

    onChangeOpacity: () => {}
  }

  render() {
    const { layers, visible, activeLayer } = this.props;

    return (
      <Tooltip
        overlay={
          visible &&
            <LegendOpacityTooltip
              layers={layers}
              activeLayer={activeLayer}
              onChangeOpacity={this.props.onChangeOpacity}
            />
        }
        overlayClassName={`c-rc-tooltip ${classnames({ '-default': visible })}`}
        overlayStyle={{
          color: '#fff'
        }}
        placement="top"
        trigger={['hover', 'click']}
        destroyTooltipOnHide
      >
        <button
          type="button"
          styleName={`c-legend-button opacity ${classnames({ '-disabled': !visible })}`}
          aria-label="Change opacity"
        >
          <Icon name="icon-opacity" className="-small" />
        </button>
      </Tooltip>
    );
  }
}

export default CSSModules(LegendItemButtonOpacity, styles, { allowMultiple: true });
