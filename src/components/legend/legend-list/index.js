import { SortableContainer } from 'react-sortable-hoc';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import LegendListItem from './legend-item';

import styles from './styles.scss';

class LegendList extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    sortable: PropTypes.bool,

    // COMPONENTS
    LegendItemToolbar: PropTypes.element,
    LegendItemTypes: PropTypes.element,

    // ACTIONS
    onChangeBBox: PropTypes.func,
    onChangeLayer: PropTypes.func,
    onChangeOpacity: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    onRemoveLayer: PropTypes.func,
    onChangeInfo: PropTypes.func
  }

  static defaultProps = {
    items: [],
    sortable: true,

    // COMPONENTS
    LegendItemToolbar: null,
    LegendItemTypes: null,

    // ACTIONS
    onChangeBBox: () => {},
    onChangeLayer: () => {},
    onChangeOpacity: () => {},
    onChangeVisibility: () => {},
    onRemoveLayer: () => {},
    onChangeInfo: () => {}
  }

  render() {
    const { items, theme } = this.props;
    const style = { ...styles, theme };
    return (
      <ul className={style.cLegendList}>
        {items.map((value, index) => (
          <LegendListItem
            theme={theme}
            key={value.dataset}
            index={index}
            value={value}
            sortable={this.props.sortable}

            // COMPONENTS
            LegendItemToolbar={this.props.LegendItemToolbar}
            LegendItemTypes={this.props.LegendItemTypes}

            // ACTIONS
            onChangeBBox={this.props.onChangeBBox}
            onChangeInfo={this.props.onChangeInfo}
            onChangeLayer={this.props.onChangeLayer}
            onChangeOpacity={this.props.onChangeOpacity}
            onChangeVisibility={this.props.onChangeVisibility}
            onRemoveLayer={this.props.onRemoveLayer}
          />
        ))}
      </ul>
    );
  }
}

export default SortableContainer(LegendList);
