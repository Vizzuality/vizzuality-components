import { SortableContainer } from 'react-sortable-hoc';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class LegendList extends PureComponent {
  static propTypes = {
    sortable: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    sortable: true,
    children: []
  }

  render() {
    const { sortable, children } = this.props;

    return (
      <ul styleName="c-legend-list">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            sortable,
            index
          }))
        }
      </ul>
    );
  }
}

const LegendListStyled = LegendList;

export default SortableContainer(LegendListStyled);
