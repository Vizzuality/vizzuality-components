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
    children: PropTypes.node
  }

  static defaultProps = {
    // Props
    children: []
  }

  state = {
    tooltipOpened: false
  }

  onTooltipVisibilityChange = (tooltipOpened) => {
    this.setState({ tooltipOpened });
  }

  render() {
    const { children, theme } = this.props;
    const style = { ...styles, ...theme };

    const props = {
      ...this.props,
      tooltipOpened: this.state.tooltipOpened,
      onTooltipVisibilityChange: this.onTooltipVisibilityChange
    };

    return (
      <div className={style.cLegendItemToolbar}>
        {!!React.Children.count(children) &&
          React.Children.map(children, c =>
            React.cloneElement(
              c,
              {
                ...props,
                tooltipOpened: this.state.tooltipOpened,
                onTooltipVisibilityChange: this.onTooltipVisibilityChange
              }
            ))
        }

        {/* If there is no children defined, let's use the components we had */}
        {!React.Children.count(children) && <LegendItemButtonBBox {...props} />}
        {!React.Children.count(children) && <LegendItemButtonLayers {...props} />}
        {!React.Children.count(children) && <LegendItemButtonOpacity {...props} />}
        {!React.Children.count(children) && <LegendItemButtonVisibility {...props} />}
        {!React.Children.count(children) && <LegendItemButtonInfo {...props} />}
        {!React.Children.count(children) && <LegendItemButtonRemove {...props} /> }

      </div>
    );
  }
}
export default LegendItemToolbar;

export {
  LegendItemButtonBBox,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonInfo,
  LegendItemButtonRemove
};
