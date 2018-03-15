import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';

import { SortableHandle } from 'react-sortable-hoc';

// Components
import Icon from 'components/icon';

// Styles
import styles from './styles.scss';

class LegendItemDrag extends PureComponent {
  render() {
    return (
      <span styleName="c-legend-handler">
        <Icon name="icon-drag-dots" className="-small" />
      </span>
    );
  }
}

const LegendItemDragStyled = CSSModules(LegendItemDrag, styles, { allowMultiple: true });

export default SortableHandle(LegendItemDragStyled);
