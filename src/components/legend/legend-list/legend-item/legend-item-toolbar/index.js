import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import LegendItemButtonBBox from './legend-item-button-bbox';
import LegendItemButtonLayers from './legend-item-button-layers';
import LegendItemButtonOpacity from './legend-item-button-opacity';
import LegendItemButtonVisibility from './legend-item-button-visibility';
import LegendItemButtonInfo from './legend-item-button-info';
import LegendItemButtonRemove from './legend-item-button-remove';

// Styles
import styles from './styles.scss';

export class LegendItemToolbar extends PureComponent {
  static propTypes = {
    // Props
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div styleName="c-legend-item-toolbar">
        {React.Children.map(this.props.children, c =>
          React.cloneElement(
            c,
            { ...this.props }
          ))}
      </div>
    );
  }
}
export default CSSModules(LegendItemToolbar, styles, { allowMultiple: true });

export {
  LegendItemButtonBBox,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonInfo,
  LegendItemButtonRemove
};
