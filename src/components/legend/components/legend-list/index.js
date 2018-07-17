import { SortableContainer } from 'react-sortable-hoc';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

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

const LegendListStyled = CSSModules(LegendList, styles, { allowMultiple: true });

export default SortableContainer(LegendListStyled);
