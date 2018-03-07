import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import { arrayMove } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';

import LegendList from './legend-list';

import styles from './styles.scss';

export class Legend extends React.PureComponent {
  static propTypes = {
    /** LayerGroupsSpec. Check it here */
    layerGroups: PropTypes.array,
    /** Should the legend be expanded by default? */
    expanded: PropTypes.bool,
    /** Disable all interactions but info */
    sortable: PropTypes.bool,

    // COMPONENTS
    LegendItemToolbar: PropTypes.element.isRequired,

    // ACTIONS
    /** ```onChangeInfo = (currentLayer) => {}``` */
    onChangeInfo: PropTypes.func,
    /** ```onChangeLayer = (currentLayer) => {}``` */
    onChangeLayer: PropTypes.func,
    /** ```onChangeVisibility = (currentLayer, visibility) => {}``` */
    onChangeVisibility: PropTypes.func,
    /** ```onChangeOpacity = (currentLayer, opacity) => {}``` */
    onChangeOpacity: PropTypes.func,
    /** ```onChangeOrder = (layerGroupsIds) => {}``` */
    onChangeOrder: PropTypes.func,
    /** ```onRemoveLayer = (currentLayer) => {}``` */
    onRemoveLayer: PropTypes.func
  }

  static defaultProps = {
    layerGroups: [],
    expanded: true,
    sortable: true,

    // FUNCTIONS
    onChangeInfo: l => console.info(l),
    onChangeLayer: l => console.info(l),
    onChangeVisibility: (l, v) => console.info(l, v),
    onChangeOpacity: (l, o) => console.info(l, o),
    onChangeOrder: ids => console.info(ids),
    onRemoveLayer: l => console.info(l)
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
    const layers = [...this.props.layerGroups];
    const layersDatasets = arrayMove(layers, oldIndex, newIndex)
      .map(l => l.dataset);

    this.props.onChangeOrder(layersDatasets);
  }


  render() {
    const { layerGroups, sortable, LegendItemToolbar } = this.props;

    return (
      <div styleName="c-legend-map">
        {/* LEGEND OPENED */}
        <div
          styleName={`open-legend ${classnames({ '-active': this.state.expanded })}`}
        >
          {/* Toggle button */}
          <button type="button" styleName="toggle-legend" onClick={() => this.onToggleLegend(false)}>
            <Icon name="icon-arrow-down" className="-small" />
          </button>

          <LegendList
            items={layerGroups}
            helperClass="c-legend-item -sort"
            onSortEnd={this.onSortEnd}
            axis="y"
            lockAxis="y"
            lockToContainerEdges
            lockOffset="50%"
            useDragHandle
            sortable={sortable}

            // COMPONENTS
            LegendItemToolbar={LegendItemToolbar}

            // ACTIONS
            onChangeInfo={this.props.onChangeInfo}
            onChangeLayer={this.props.onChangeLayer}
            onChangeOpacity={this.props.onChangeOpacity}
            onChangeVisibility={this.props.onChangeVisibility}
            onRemoveLayer={this.props.onRemoveLayer}
          />
        </div>

        {/* LEGEND CLOSED */}
        <div
          styleName={`close-legend ${classnames({ '-active': !this.state.expanded })}`}
          onClick={() => this.onToggleLegend(true)}
        >
          <h1 styleName="legend-title">
            Legend

            {/* Toggle button */}
            <button type="button" styleName="toggle-legend">
              <Icon name="icon-arrow-up" className="-small" />
            </button>
          </h1>
        </div>
      </div>
    );
  }
}

export default CSSModules(Legend, styles, { allowMultiple: true });
