import React, { PureComponent } from 'react';

// Components
import Icon from 'components/icon';

class LegendItemDrag extends PureComponent {
  render() {
    return (
      <span className="handler">
        <Icon name="icon-drag-dots" className="-small" />
      </span>
    );
  }
}

export default LegendItemDrag;
