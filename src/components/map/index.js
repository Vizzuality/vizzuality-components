import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

const { L } = window;

class Map extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    mapOptions: PropTypes.object,
    basemap: PropTypes.object,
    label: PropTypes.object,
    bounds: PropTypes.object,
    events: PropTypes.object
  }

  static defaultProps = {
    mapOptions: {
      zoomControl: false,
      center: [27, 12],
      zoom: 3,
      maxZoom: 19,
      minZoom: 2
    },
    basemap: {
      url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    },
    label: {
      url: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    },
    bounds: {
      bbox: null,
      options: {} // fitBounds options
    },
    events: {}
  }

  componentDidMount() {
    this.setMap();
    this.setBasemap();
    this.setLabel();
    this.setMapEvents();
  }

  componentWillUnmount() {
    this.removeMapEvents();
  }

  setMap = () => {
    if (
      typeof L === 'undefined' ||
      !this.mapNode
    ) {
      return;
    }

    const { mapOptions } = this.props;
    this.map = L.map(this.mapNode, mapOptions);
  }

  setBasemap = () => {
    const { basemap } = this.props;

    L.tileLayer(basemap.url, basemap.options)
      .addTo(this.map)
      .setZIndex(0);
  }

  setLabel = () => {
    const { label } = this.props;

    L.tileLayer(label.url, label.options)
      .addTo(this.map)
      .setZIndex(1100);
  }

  setBounds = () => {
    const { bbox, options } = this.props.bounds;

    const bounds = [
      [bbox[1], bbox[0]],
      [bbox[3], bbox[2]]
    ];

    this.map.fitBounds(bounds, options);
  }

  setMapEvents() {
    const { events } = this.props;

    Object.keys(events).forEach((key) => {
      this.map.on(key, (e) => {
        events[key](e, this.map);
      });
    });
  }

  removeMapEvents() {
    const { events } = this.props;

    Object.keys(events).forEach((key) => {
      this.map.off(key);
    });
  }

  render() {
    return (
      <div styleName="c-map">
        <div
          ref={(node) => { this.mapNode = node; }}
          styleName="map-container"
        />

        {this.map && this.props.children(this.map)}
      </div>
    );
  }
}

export default CSSModules(Map, styles, { allowMultiple: true });
