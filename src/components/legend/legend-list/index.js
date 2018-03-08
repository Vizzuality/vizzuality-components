import { SortableContainer } from 'react-sortable-hoc';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import LegendListItem from './legend-item';

import styles from './styles.scss';

class LegendList extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    sortable: PropTypes.bool,

    // COMPONENTS
    LegendItemToolbar: PropTypes.element,

    // ACTIONS
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

    // ACTIONS
    onChangeLayer: () => {},
    onChangeOpacity: () => {},
    onChangeVisibility: () => {},
    onRemoveLayer: () => {},
    onChangeInfo: () => {}
  }

  render() {
    const { items } = this.props;

    return (
      <ul styleName="c-legend-list">
        {items.map((value, index) => (
          <LegendListItem
            key={value.dataset}
            index={index}
            value={value}
            sortable={this.props.sortable}

            // COMPONENTS
            LegendItemToolbar={this.props.LegendItemToolbar}

            // ACTIONS
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

const LegendListStyled = CSSModules(LegendList, styles, { allowMultiple: true });

export default SortableContainer(LegendListStyled);
