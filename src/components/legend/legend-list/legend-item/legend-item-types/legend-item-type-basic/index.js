import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import LegendItem from './legend-item-type-basic-item';
import styles from './styles.scss';

export class LegendTypeBasic extends React.PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    mode: PropTypes.oneOf(['horizontal', 'vertical', 'columns'])
  };

  static defaultProps = {
    activeLayer: {},
    mode: 'vertical'
  };

  render() {
    const { activeLayer, mode, theme } = this.props;
    const { legendConfig } = activeLayer;

    if (!legendConfig || legendConfig.type !== 'basic') {
      return null;
    }

    return (
      <div className={theme.cLegendTypeBasic}>
        <ul className={theme[mode]}>
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

export default themr('LegendTypeBasic', styles)(LegendTypeBasic);
