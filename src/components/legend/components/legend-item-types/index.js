import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import LegendItemTypeBasic from './legend-item-type-basic';
import LegendItemTypeChoropleth from './legend-item-type-choropleth';
import LegendItemTypeGradient from './legend-item-type-gradient';
import LegendItemTypeProportional from './legend-item-type-proportional';
import Spinner from '../../../spinner';
import './styles.scss';

class LegendItemTypes extends PureComponent {
  static propTypes = {
    // Props
    children: PropTypes.node,
    activeLayer: PropTypes.object
  }

  static defaultProps = {
    // Props
    children: [],
    activeLayer: {}
  }

  state = {
    activeLayer: {},
    loading: false
  }

  componentDidMount() {
    const { activeLayer } = this.props;
    const { legendConfig } = activeLayer;
    const { url, dataParse } = legendConfig;

    if(url) {
      this.setState({ loading: true });

      fetch(url)
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((response) => {
          const parsedActiveLayer = typeof dataParse === 'function' ? dataParse(activeLayer, response) : response;
          this.setState({ activeLayer: parsedActiveLayer, loading: false });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    }
  }

  render() {
    const { children, activeLayer: propsActiveLayer } = this.props;
    const { loading, activeLayer: stateActiveLayer } = this.state;
    const activeLayer = !isEmpty(stateActiveLayer) ? stateActiveLayer : propsActiveLayer;

    const { legendConfig } = activeLayer;
    const { url } = legendConfig;
    const shouldRender = !url || (url && !isEmpty(stateActiveLayer));

    return (
      <div styleName="c-legend-item-types">
        {(url && loading) && (
          <Spinner
            position="relative"
            style={{
              box: { width: 20, height: 20 }
            }}            
          />
        )}

        {shouldRender && !!React.Children.count(children) &&
          React.Children.map(children, child => (React.isValidElement(child) && typeof child.type !== 'string' ?
            React.cloneElement(child, { ...this.props })
            :
            child
        ))}

        {/* If there is no children defined, let's use the components we have */}
        {(shouldRender && !React.Children.count(children)) && <LegendItemTypeBasic {...this.props} />}
        {(shouldRender && !React.Children.count(children)) && <LegendItemTypeChoropleth {...this.props} />}
        {(shouldRender && !React.Children.count(children)) && <LegendItemTypeGradient {...this.props} />}
        {(shouldRender && !React.Children.count(children)) && <LegendItemTypeProportional {...this.props} />}

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
