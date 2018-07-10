import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

// Styles
import styles from './styles.scss';

import LegendItemTypeBasic from './legend-item-type-basic';
import LegendItemTypeChoropleth from './legend-item-type-choropleth';
import LegendItemTypeGradient from './legend-item-type-gradient';
import LegendItemTypeProportional from './legend-item-type-proportional';

class LegendItemTypes extends React.Component {
  static propTypes = {
    // Props
    children: PropTypes.node
  }

  static defaultProps = {
    // Props
    children: []
  }

  render() {
    const { children, theme } = this.props;

    return (
      <div className={theme.cLegendItemTypes}>
        {!!React.Children.count(children) &&
          React.Children.map(children, c =>
            React.cloneElement(
              c,
              { ...this.props }
            ))
        }

        {/* If there is no children defined, let's use the components we have */}
        {!React.Children.count(children) && <LegendItemTypeBasic {...this.props} />}
        {!React.Children.count(children) && <LegendItemTypeChoropleth {...this.props} />}
        {!React.Children.count(children) && <LegendItemTypeGradient {...this.props} />}
        {!React.Children.count(children) && <LegendItemTypeProportional {...this.props} />}
      </div>
    );
  }
}

export default themr('LegendItemTypes', styles)(LegendItemTypes);

export {
  LegendItemTypeBasic,
  LegendItemTypeChoropleth,
  LegendItemTypeGradient,
  LegendItemTypeProportional
};
