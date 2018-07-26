import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

export class MapControls extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    map: PropTypes.object.isRequired
  }

  render() {
    return (
      <div styleName="c-map-controls">
        <ul styleName="map-controls-list">
          {React.Children.map(this.props.children, (c, i) => (
            <li styleName="map-controls-list-item" key={i}>
              {React.cloneElement(
                c,
                { map: this.props.map }
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSSModules(MapControls, styles, { allowMultiple: true });
