import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import { arrayMove } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';
import LegendList from './components/legend-list';

import styles from './styles.scss';

export class Legend extends React.PureComponent {
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

  state = { expanded: this.props.expanded }

  /**
   * UI EVENTS
   * onToggleLegend
   * onSortEnd
  */
  onToggleLegend = (bool) => {
    this.setState({ expanded: bool });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const layers = [...this.props.children.map(c => c.props.layerGroup.dataset)];
    const layersDatasets = arrayMove(layers, oldIndex, newIndex);

    this.props.onChangeOrder(layersDatasets);
  }

  render() {
    const {
      sortable,
      collapsable,
      maxWidth,
      maxHeight,
      children
    } = this.props;

    if (children && !children.length) {
      return null;
    }

    return (
      <div styleName="c-legend-map" style={{ maxWidth }}>
        {/* LEGEND OPENED */}
        <div
          styleName={`open-legend ${classnames({ '-active': this.state.expanded })}`}
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
          styleName={`close-legend ${classnames({ '-active': !this.state.expanded })}`}
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

export default CSSModules(Legend, styles, { allowMultiple: true });
