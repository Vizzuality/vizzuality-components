import React, { PureComponent } from 'react';

import { SortableHandle } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';

// Styles
import styles from './styles.scss';

class LegendItemDrag extends PureComponent {
  render() {
    const { theme } = this.props;
    const style = { ...styles, ...theme };
    return (
      <span className={style.cLegendHandler}>
        <Icon name="icon-drag-dots" className="-small" />
      </span>
    );
  }
}

export default SortableHandle(LegendItemDrag);
