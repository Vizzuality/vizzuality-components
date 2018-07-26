import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import isEqual from 'lodash/isEqual';

import styles from './styles.scss';

const { L } = window;

export class MapComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    mapOptions: PropTypes.object,
    basemap: PropTypes.object,
    label: PropTypes.object,
    bounds: PropTypes.object,
    events: PropTypes.object,
    interactionEnabled: PropTypes.bool,
    scrollZoomEnabled: PropTypes.bool
  }

  static defaultProps = {
    children: null,
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
    events: {},
    interactionEnabled: true
  }

  componentDidMount() {
    if (
      typeof L === 'undefined' ||
      !this.mapNode
    ) {
      return;
    }

    this.setMap();

    this.setBasemap();
    this.setLabel();

    this.setBounds();

    this.setMapEvents();

    if (!this.props.interactionEnabled) {
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      this.map.boxZoom.disable();
      this.map.keyboard.disable();
    }

    if (!this.props.scrollZoomEnabled) {
      this.map.scrollWheelZoom.disable();
    }

    // As this.map didn't exist before this function
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    const {
      basemap: prevBasemap,
      label: prevLabel,
      bounds: prevBounds,
      events: prevEvents
    } = prevProps;

    const {
      basemap: nextBasemap,
      label: nextLabel,
      bounds: nextBounds,
      events: nextEvents
    } = this.props;

    // Basemap
    if (!isEqual(prevBasemap, nextBasemap)) {
      this.setBasemap();
    }

    // Label
    if (!isEqual(prevLabel, nextLabel)) {
      this.setLabel();
    }

    // Bounds
    if (!isEqual(prevBounds, nextBounds)) {
      this.setBounds();
    }

    // Events
    if (!isEqual(prevEvents, nextEvents)) {
      this.setMapEvents();
    }
  }

  componentWillUnmount() {
    this.removeMapEvents();
  }

  setMap = () => {
    const { mapOptions } = this.props;
    this.map = L.map(this.mapNode, mapOptions);
  }

  setBasemap = () => {
    const { basemap } = this.props;

    if (this.basemapLayer) this.basemapLayer.remove();

    this.basemapLayer = L.tileLayer(basemap.url, basemap.options)
      .addTo(this.map)
      .setZIndex(0);
  }

  setLabel = () => {
    const { label } = this.props;

    if (this.labelLayer) this.labelLayer.remove();

    this.labelLayer = L.tileLayer(label.url, label.options)
      .addTo(this.map)
      .setZIndex(1100);
  }

  setBounds = () => {
    const { bbox, options } = this.props.bounds;

    if (bbox) {
      const bounds = [
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]]
      ];

      this.map.fitBounds(bounds, options);
    }
  }

  setMapEvents() {
    const { events } = this.props;

    this.removeMapEvents();

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

        {!!this.map && !!this.props.children && this.props.children(this.map)}
      </div>
    );
  }
}

export default CSSModules(MapComponent, styles, { allowMultiple: true });
