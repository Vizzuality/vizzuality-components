import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import isEqual from 'lodash/isEqual';

import styles from './styles.scss';

const { L } = (typeof window !== 'undefined') ? window : {};

export class Maps extends Component {
  events = {}

  static propTypes = {
    /** A function that returns the map instance */
    children: PropTypes.func,
    /** Custom css class for styling */
    customClass: PropTypes.string,
    /** Leaflet props for creating a map
     * @see Check Leaflet documentation  https://leafletjs.com/reference-1.3.0.html#map
    */
    mapOptions: PropTypes.object,
    /** `{ url: 'http://example/{x}/{y}/{z}', options: {}}`
     * @see Check Leaflet documentation  https://leafletjs.com/reference-1.3.0.html#tilelayer
    */
    basemap: PropTypes.object,
    /** `{ url: 'http://example/{x}/{y}/{z}', options: {} }` Options for L.tileLayer
     * @see Check Leaflet documentation  https://leafletjs.com/reference-1.3.0.html#tilelayer
    */
    label: PropTypes.object,
    /** `{ bbox: [10, 5, 20, 10], options: {} }`
     * @see Check Leaflet documentation  https://leafletjs.com/reference-1.3.0.html#fitbounds-options
    */
    bounds: PropTypes.object,
    /**
     * `{ click: (e, map) => {} }` All the functions return 2 params
     * @arg {Object} e event
     * @arg {Object} map Map instance
     * @see Cheack Leaflet documentation https://leafletjs.com/reference-1.3.0.html#map-event
    */
    events: PropTypes.object,
    /** Removes all interactions available on the map  */
    interactionEnabled: PropTypes.bool,
    /** Removes only zoomScroll on the map  */
    scrollZoomEnabled: PropTypes.bool,
    /**
     * Return map instance when this one is ready
     * @arg {Object} map Map instance
    */
    onReady: PropTypes.func
  }

  static defaultProps = {
    children: null,
    customClass: null,
    mapOptions: {
      zoomControl: false,
      center: [27, 12],
      zoom: 3,
      maxZoom: 20,
      minZoom: 2
    },
    basemap: {
      url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      options: {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    },
    label: {
      url: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
      options: {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    },
    bounds: {
      bbox: null,
      options: {} // fitBounds options
    },
    events: {},
    interactionEnabled: true,
    scrollZoomEnabled: true,
    onReady: () => {}
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

    this.setEvents();

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

    this.props.onReady(this.map);

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
      this.setEvents();
    }
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  setMap = () => {
    const { mapOptions } = this.props;
    this.map = L.map(this.mapNode, { ...Maps.defaultProps.mapOptions, ...mapOptions });
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

  setEvents() {
    const { events } = this.props;

    this.removeEvents();

    Object.keys(events).forEach((key) => {
      this.events[key] = (e) => {
        events[key](e, this.map);
      }

      this.map.on(key, this.events[key]);
    });
  }

  removeEvents() {
    Object.keys(this.events).forEach((key) => {
      this.map.off(key, this.events[key]);
    });
  }

  render() {
    const { customClass } = this.props;
    const externalClass = classnames({ [customClass]: !!customClass });

    return (
      <div styleName="c-map" className={externalClass}>
        <div
          ref={(node) => { this.mapNode = node; }}
          styleName="map-container"
        />

        {!!this.map && !!this.props.children && this.props.children(this.map)}
      </div>
    );
  }
}

export default CSSModules(Maps, styles, { allowMultiple: true });
export { default as MapPopup } from './map-popup';
export { default as MapControls } from './map-controls';
export { default as ZoomControl } from './map-controls/zoom-control';
