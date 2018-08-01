import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

export class MapControls extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /** Custom css class for styling */
    customClass: PropTypes.string
  }

  static defaultProps = { customClass: null }

  render() {
    const { customClass } = this.props;
    const externalClass = classnames({ [customClass]: !!customClass });

    return (
      <div styleName="c-map-controls" className={externalClass}>
        <ul styleName="map-controls-list">
          {React.Children.map(this.props.children, (c, i) => (
            <li styleName="map-controls-list-item" key={i}>
              {React.cloneElement(c)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSSModules(MapControls, styles, { allowMultiple: true });
