import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LegendItemTypeBasic from './legend-item-type-basic';
import LegendItemTypeChoropleth from './legend-item-type-choropleth';
import LegendItemTypeGradient from './legend-item-type-gradient';
import LegendItemTypeProportional from './legend-item-type-proportional';
import './styles.scss';

class LegendItemTypes extends PureComponent {
  static propTypes = {
    // Props
    children: PropTypes.node
  }

  static defaultProps = {
    // Props
    children: []
  }

  render() {
    const { children } = this.props;

    return (
      <div styleName="c-legend-item-types">
        {!!React.Children.count(children) &&
          React.Children.map(children, child => (React.isValidElement(child) && typeof child.type !== 'string' ?
            React.cloneElement(child, { ...this.props })
            :
            child
        ))}

        {/* If there is no children defined, let's use the components we have */}
        {!React.Children.count(children) && <LegendItemTypeBasic {...this.props} />}
        {!React.Children.count(children) && <LegendItemTypeChoropleth {...this.props} />}
        {!React.Children.count(children) && <LegendItemTypeGradient {...this.props} />}
        {!React.Children.count(children) && <LegendItemTypeProportional {...this.props} />}
      </div>
    );
  }
}

export default LegendItemTypes;

export {
  LegendItemTypeBasic,
  LegendItemTypeChoropleth,
  LegendItemTypeGradient,
  LegendItemTypeProportional
};
