import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { SortableElement } from 'react-sortable-hoc';

// Components
import LegendItemType from './legend-item-type';
import LegendItemDrag from './legend-item-drag';
import LegendItemTimeline from './legend-item-timeline';

import styles from './styles.scss';

class LegendItem extends PureComponent {
  static propTypes = {
    dataset: PropTypes.string,
    layers: PropTypes.array,
    sortable: PropTypes.bool,

    // Custom components
    LegendItemToolbar: PropTypes.element
  }

  static defaultProps = {
    dataset: '',
    layers: [],
    sortable: true,
    LegendItemToolbar: null
  }

  render() {
    const { layers, sortable, LegendItemToolbar } = this.props;

    const activeLayer = layers.find(l => l.active);

    return (
      <li
        styleName={classnames({
          'c-legend-item': true,
          '-sortable': sortable
        })}
      >
        {sortable &&
          <LegendItemDrag />
        }

        <div styleName="legend-info">
          <header styleName="legend-item-header">
            <h3>{activeLayer.name}</h3>

            {!!LegendItemToolbar &&
              React.cloneElement(
                LegendItemToolbar,
                {
                  ...this.props,
                  activeLayer
                }
              )
            }
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
