import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SortableElement } from 'react-sortable-hoc';
import { themr } from 'react-css-themr';

// Components
import LegendItemDrag from './legend-item-drag';
import LegendItemTimeline from './legend-item-timeline';

import styles from './styles.scss';

class LegendItem extends PureComponent {
  static propTypes = {
    dataset: PropTypes.string,
    layers: PropTypes.array,
    sortable: PropTypes.bool,

    // Custom components
    LegendItemToolbar: PropTypes.element,
    LegendItemTypes: PropTypes.element
  }

  static defaultProps = {
    dataset: '',
    layers: [],
    sortable: true,
    LegendItemToolbar: null,
    LegendItemTypes: null
  }

  render() {
    const { layers, sortable, LegendItemToolbar, LegendItemTypes, theme } = this.props;
    const activeLayer = layers.find(l => l.active);

    return (
      <li
        className={cx(
          theme.cLegendItem,
          sortable ? theme.sortable : null
        )}
      >
        <div
          className={cx(
            theme.legendItemContainer,
            sortable ? theme.sortable : null
          )}
        >
          {sortable &&
            <LegendItemDrag theme={theme} />
          }

          <div className={theme.legendInfo}>
            <header className={theme.legendItemHeader}>
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

            {!!LegendItemTypes &&
              React.cloneElement(
                LegendItemTypes,
                {
                  ...this.props,
                  activeLayer
                }
              )
            }

            <LegendItemTimeline
              {...this.props}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default SortableElement(themr('LegendItem', styles)(({ value, ...props }) => <LegendItem key={props.dataset} {...value} {...props} />));
