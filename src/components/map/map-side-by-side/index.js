import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import './lib';

import styles from './styles.scss';

const { L } = (typeof window !== 'undefined') ? window : {};

export class MapSideBySide extends React.PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    /**
     * Return side-by-side control instance when this one is ready
     * @see Check Leaflet control documentation https://github.com/digidem/leaflet-side-by-side
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

export default CSSModules(MapSideBySide, styles, { allowMultiple: true });