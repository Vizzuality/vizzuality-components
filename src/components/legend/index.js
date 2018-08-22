import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { arrayMove } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';
import LegendList from './components/legend-list';

import './styles.scss';

class Legend extends PureComponent {
  static propTypes = {
    /** Sortable */
    sortable: PropTypes.bool,
    /** Max width */
    maxWidth: PropTypes.number,
    /** Max height */
    maxHeight: PropTypes.number,
    /** Should the legend be expanded by default? */
    expanded: PropTypes.bool,
    /** Should the legend be collapsable */
    collapsable: PropTypes.bool,
    /** `onChangeOrder = (layerGroupsIds) => {}`
      * @arg {Array} layerGroupIds The new order
    */
    onChangeOrder: PropTypes.func,
    /** Children for render */
    children: PropTypes.node
  }

  static defaultProps = {
    sortable: true,
    expanded: true,
    collapsable: true,
    maxWidth: null,
    maxHeight: null,
    children: [],
    onChangeOrder: ids => console.info(ids)
  }

  constructor(props) {
    super(props);
    const { expanded } = props;
    this.state = { expanded }
  }

  /**
   * UI EVENTS
   * onToggleLegend
   * onSortEnd
  */
  onToggleLegend = (bool) => {
    this.setState({ expanded: bool });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { onChangeOrder, children } = this.props;
    const layers = [...children.map(c => c.props.layerGroup.dataset)];
    const layersDatasets = arrayMove(layers, oldIndex, newIndex);

    onChangeOrder(layersDatasets);
  }

  render() {
    const {
      sortable,
      collapsable,
      maxWidth,
      maxHeight,
      children
    } = this.props;

    const { expanded } = this.state;

    if (children && !children.length) {
      return null;
    }

    return (
      <div styleName="c-legend-map" style={{ maxWidth }}>
        {/* LEGEND OPENED */}
        <div
          styleName={`open-legend ${classnames({ '-active': expanded })}`}
          style={{ maxHeight }}
        >
          {/* Toggle button */}
          {collapsable && (
            <button type="button" styleName="toggle-legend" onClick={() => this.onToggleLegend(false)}>
              <Icon name="icon-arrow-down" className="-small" />
            </button>
          )}

          <LegendList
            helperClass="c-legend-item -sortable"
            onSortStart={(_, event) =>
              event.preventDefault() // It fixes user select in Safari and IE
            }
            onSortEnd={this.onSortEnd}
            axis="y"
            lockAxis="y"
            lockToContainerEdges
            lockOffset="50%"
            useDragHandle
            sortable={sortable}
          >
            {React.Children.map(children, (child, index) => (
              React.isValidElement(child) && child.type === 'LegendItemList' ?
              React.cloneElement(child, { sortable, index })
              :
              child
            ))}
          </LegendList>
        </div>

        {/* LEGEND CLOSED */}
        <button
          type="button"
          styleName={`close-legend ${classnames({ '-active': !expanded })}`}
          onClick={() => this.onToggleLegend(true)}
        >
          <h1 styleName="legend-title">
            Legend

            {/* Toggle button */}
            <div styleName="toggle-legend">
              <Icon name="icon-arrow-up" className="-small" />
            </div>
          </h1>
        </button>
      </div>
    );
  }
}

export default Legend;
export { default as LegendListItem } from './components/legend-list-item';
export {
  default as LegendItemToolbar,
  LegendItemButtonBBox,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonInfo,
  LegendItemButtonRemove
} from './components/legend-item-toolbar';

export {
  default as LegendItemTypes,
  LegendItemTypeBasic,
  LegendItemTypeChoropleth,
  LegendItemTypeGradient,
  LegendItemTypeProportional
} from './components/legend-item-types';

export { default as LegendItemTimeline } from './components/legend-item-timeline';
