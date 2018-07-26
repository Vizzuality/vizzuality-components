import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

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
    const { name, color, size, icon, value } = this.props;

    if (iconName === 'triangle') {
      return (
        <div
          styleName={`icon-${icon}`}
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
      return (<div styleName={`icon-${icon}`} style={{ width: size, backgroundColor: color }} />);
    }

    if (iconName === 'square' || iconName === 'circle') {
      return (
        <div
          styleName={`icon-${icon}`}
          style={{ width: size, height: size, backgroundColor: color }}
        />
      );
    }

    return (
      <div styleName="custom-icon">
        <img src={icon} alt={name || value} />
      </div>
    );
  };

  render() {
    const { name, icon, value } = this.props;

    return (
      <div styleName="c-legend-item">
        {this.getIconHtml(icon)}
        <span styleName="name">{name || value}</span>
      </div>
    );
  }
}

export default CSSModules(LegendItem, styles, { allowMultiple: true });
