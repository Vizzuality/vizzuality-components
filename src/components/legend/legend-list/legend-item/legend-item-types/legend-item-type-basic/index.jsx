import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import LegendItem from './legend-item-type-basic-item';
import styles from './styles.scss';

export class LegendTypeBasic extends React.PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    mode: PropTypes.oneOf(['horizontal', 'vertical', 'columns'])
  };

  static defaultProps = {
    activeLayer: {},
    mode: 'columns'
  };

  render() {
    const { activeLayer, mode } = this.props;
    const { legendConfig } = activeLayer;

    if (!legendConfig || legendConfig.type !== 'basic') {
      return null;
    }

    return (
      <div styleName="c-legend-type-basic">
        <ul styleName={mode}>
          {legendConfig.items.map(item => (
            <li key={`legend-basic-item-${item.name}`}>
              <LegendItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSSModules(LegendTypeBasic, styles, { allowMultiple: true });
