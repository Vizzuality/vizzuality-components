import React from 'react';
import PropTypes from 'prop-types';

import './lib';

import './styles.scss';

const { L } = (typeof window !== 'undefined') ? window : {};

export class MapSideBySide extends React.PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    /**
     * Return side-by-side control instance when this one is ready
     * @arg {Object} sideBySide sideBySide instance
    */
    onReady: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { map, onReady } = this.props;

    if (
      typeof L === 'undefined' ||
      !map ||
      !L.control.sideBySide ||
      typeof L.control.sideBySide !== 'function'
    ) {
      return;
    }

    this.sideBySideControl = L.control.sideBySide();
    this.sideBySideControl.addTo(map);

    if (onReady) onReady(this.sideBySideControl);    
  }

  render() {
    return null;
  }
}

export default MapSideBySide;
