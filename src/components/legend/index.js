import React from 'react';
import PropTypes from 'prop-types';
// import CSSModules from 'react-css-modules';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import { arrayMove } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';

import LegendList from './legend-list';

import styles from './styles.scss';

export class Legend extends React.PureComponent {
  static propTypes = {
    /** LayerGroupsSpec. Check it here */
    layerGroups: PropTypes.array,
    /** Max width */
    maxWidth: PropTypes.number,
    /** Max height */
    maxHeight: PropTypes.number,
    /** Should the legend be expanded by default? */
    expanded: PropTypes.bool,
    /** Should the legend be sortable? */
    sortable: PropTypes.bool,
    /** Should the legend be collapsable */
    collapsable: PropTypes.bool,


    // COMPONENTS
    LegendItemToolbar: PropTypes.element,
    LegendItemTypes: PropTypes.element,

    // ACTIONS
    /** ```onChangeBBox = (currentLayer) => {}``` */
    onChangeBBox: PropTypes.func,
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
    collapsable: true,

    maxWidth: null,
    maxHeight: null,

    // COMPONENTS
    LegendItemToolbar: null,
    LegendItemTypes: null,

    // FUNCTIONS
    onChangeBBox: l => console.info(l),
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
    const {
      layerGroups,
      sortable,
      collapsable,
      maxWidth,
      maxHeight,
      LegendItemToolbar,
      LegendItemTypes,
      theme
    } = this.props;

    if (!layerGroups.length) {
      return null;
    }

    return (
      <div className={theme.cLegendMap} style={{ maxWidth }}>
        {/* LEGEND OPENED */}
        <div
          className={cx(theme.openLegend, this.state.expanded ? theme.active : '')}
          // styleName={`open-legend ${cx({ '-active': this.state.expanded })}`}
          style={{ maxHeight }}
        >
          {/* Toggle button */}
          {collapsable &&
            <button type="button" className={theme.toggleLegend} onClick={() => this.onToggleLegend(false)}>
              <Icon name="icon-arrow-down" className="-small" />
            </button>
          }

          <LegendList
            theme={theme}
            items={layerGroups}
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

            // COMPONENTS
            LegendItemToolbar={LegendItemToolbar}
            LegendItemTypes={LegendItemTypes}

            // ACTIONS
            onChangeBBox={this.props.onChangeBBox}
            onChangeInfo={this.props.onChangeInfo}
            onChangeLayer={this.props.onChangeLayer}
            onChangeOpacity={this.props.onChangeOpacity}
            onChangeVisibility={this.props.onChangeVisibility}
            onRemoveLayer={this.props.onRemoveLayer}
          />
        </div>

        {/* LEGEND CLOSED */}
        <div
          className={cx(theme.closeLegend, !this.state.expanded && theme.active )}
          onClick={() => this.onToggleLegend(true)}
        >
          <h1 className={theme.legendTitle}>
            Legend

            {/* Toggle button */}
            <button type="button" className={theme.toggleLegend}>
              <Icon name="icon-arrow-up" className="-small" />
            </button>
          </h1>
        </div>
      </div>
    );
  }
}

export default themr('Legend', styles)(Legend);
