import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import styles from './styles.scss';

export class LegendItem extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string // triangle, circle, square, line
  };

  static defaultProps = {
    size: 12,
    color: '#64d1b8',
    name: '',
    icon: 'square'
  };

  getIconHtml = (iconName) => {
    const { name, color, size, icon, theme } = this.props;

    if (iconName === 'triangle') {
      return (
        <div
          className={theme[`icon-${icon}`]}
          style={{
            boderRightWidth: (size / 2),
            boderLeftWidth: (size / 2),
            boderBottomWidth: size,
            borderBottomColor: color
          }}
        />
      );
    }

    if (iconName === 'line') {
      return (<div className={theme[`icon-${icon}`]} style={{ width: size, backgroundColor: color }} />);
    }

    if (iconName === 'square' || iconName === 'circle') {
      return (
        <div
          className={theme[`icon-${icon}`]}
          style={{ width: size, height: size, backgroundColor: color }}
        />
      );
    }

    return (
      <div className={theme.customIcon}>
        <img src={icon} alt={name} />
      </div>
    );
  };

  render() {
    const { name, icon, theme } = this.props;

    return (
      <div className={theme.cLegendItem}>
        {this.getIconHtml(icon)}
        <span className={theme.name}>{name}</span>
      </div>
    );
  }
}

export default themr('LegendItem', styles)(LegendItem);
