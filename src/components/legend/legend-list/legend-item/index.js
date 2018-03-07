import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { SortableElement } from 'react-sortable-hoc';

// Components
import LegendItemType from './legend-item-type';
import LegendItemDrag from './legend-item-drag';
import LegendItemTimeline from './legend-item-timeline';
import LegendItemButtons from './legend-item-buttons';

import styles from './styles.scss';

class LegendItem extends PureComponent {
  static propTypes = {
    dataset: PropTypes.string,
    layers: PropTypes.array
  }

  static defaultProps = {
    dataset: '',
    layers: []
  }

  render() {
    const { layers } = this.props;
    const activeLayer = layers.find(l => l.active);

    return (
      <li styleName="c-legend-item">
        <LegendItemDrag />

        <div styleName="legend-info">
          <header styleName="legend-item-header">
            <h3>{activeLayer.name}</h3>

            <LegendItemButtons
              {...this.props}
              activeLayer={activeLayer}
            />
          </header>

          <LegendItemType
            activeLayer={activeLayer}
          />

          <LegendItemTimeline
            {...this.props}
          />
        </div>
      </li>
    );
  }
}

const LegendItemStyled = CSSModules(LegendItem, styles, { allowMultiple: true });

export default SortableElement(({ value, ...props }) =>
  <LegendItemStyled key={props.dataset} {...value} {...props} />);
