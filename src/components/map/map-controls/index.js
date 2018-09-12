import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

class MapControls extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /** Custom css class for styling */
    customClass: PropTypes.string
  }

  static defaultProps = { customClass: null }

  render() {
    const { customClass, children } = this.props;
    const externalClass = classnames({ [customClass]: !!customClass });

    return (
      <div styleName="c-map-controls" className={externalClass}>
        <ul styleName="map-controls-list">
          {React.Children.map(children, (c, i) => (
            React.isValidElement(c) && (
            <li styleName="map-controls-list-item" key={i}>
              {React.cloneElement(c)}
            </li>)
          ))}
        </ul>
      </div>
    );
  }
}

export default MapControls;
