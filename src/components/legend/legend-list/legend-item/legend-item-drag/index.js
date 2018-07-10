import React, { PureComponent } from 'react';
import { themr } from 'react-css-themr';

import { SortableHandle } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';

// Styles
import styles from './styles.scss';

class LegendItemDrag extends PureComponent {
  render() {
    const { theme } = this.props;
    return (
      <span className={theme.cLegendHandler}>
        <Icon name="icon-drag-dots" className="-small" />
      </span>
    );
  }
}

export default SortableHandle(themr('LegendItemDrag', styles)(LegendItemDrag));
