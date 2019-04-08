import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import ReactMapGL from 'react-map-gl';

import './styles.scss';

const DEFAULT_VIEWPORT = {
  zoom: 2,
  lat: 0,
  lng: 0
}

class MapboxMap extends Component {
  events = {}

  static propTypes = {
    /** A function that returns the map instance */
    children: PropTypes.func,

    /** Custom css class for styling */
    customClass: PropTypes.string,

    /** An object that defines the viewport
     * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
    */
    viewport: PropTypes.shape({

    }),

    /** An object that defines the bounds */
    bounds: PropTypes.shape({
      bbox: PropTypes.array,
      options: PropTypes.shape({})
    }),

    /** A boolean that allows panning */
    dragPan: true,

    /** A boolean that allows rotating */
    dragRotate: true,

    /** A function that exposes when the map is loaded. It returns and object with the `this.map` and `this.mapContainer` reference. */
    onLoad: PropTypes.func,

    /** A function that exposes the viewport */
    onViewportChange: PropTypes.func,

    /** A function that exposes the viewport */
    getCursor: PropTypes.func
  }

  static defaultProps = {
    children: null,
    customClass: null,
    viewport: DEFAULT_VIEWPORT,
    bounds: {},
    dragPan: true,
    dragRotate: true,

    onViewportChange: () => {},
    onLoad: () => {},
    getCursor: ({ isHovering, isDragging }) => {
      if (isHovering) return 'pointer';
      if (isDragging) return 'grabbing';
      return 'grab';
    }
  }

  state = {
    viewport: {
      ...DEFAULT_VIEWPORT,
      ...this.props.viewport // eslint-disable-line
    },
    flying: false,
    loaded: false
  }

  componentDidMount() {
    const { bounds } = this.props;

    if (!isEmpty(bounds) && !!bounds.bbox) {
      this.fitBounds();
    }
  }

  componentDidUpdate(prevProps) {
    const { viewport: prevVieport, bounds: prevBounds } = prevProps;
    const { viewport, bounds } = this.props;
    const { viewport: stateViewport } = this.state;

    if (!isEqual(viewport, prevVieport)) {
      this.setState({ // eslint-disable-line
        viewport: {
          ...stateViewport,
          ...viewport
        }
      });
    }

    if (!isEqual(bounds, prevBounds)) {
      this.fitBounds();
    }
  }

  onViewportChange = (v) => {
    const { onViewportChange } = this.props;

    this.setState({ viewport: v });
    onViewportChange(v);
  }

  onResize = (v) => {
    const { onViewportChange } = this.props;
    const { viewport } = this.state;
    const newViewport = {
      ...viewport,
      ...v
    };

    this.setState({ viewport: newViewport });
    onViewportChange(newViewport);
  }

  onMoveEnd = () => {
    const { onViewportChange } = this.props;
    const { viewport } = this.state;

    if (this.map) {
      const bearing = this.map.getBearing();
      const pitch = this.map.getPitch();
      const zoom = this.map.getZoom();
      const { lng, lat } = this.map.getCenter();

      const newViewport = {
        ...viewport,
        bearing,
        pitch,
        zoom,
        latitude: lat,
        longitude: lng
      };

      // Publish new viewport and save it into the state
      onViewportChange(newViewport);
      this.setState({
        viewport: newViewport,
        flying: false
      });

    }
  }

  fitBounds = () => {
    const { flying } = this.state;
    const { bounds } = this.props;
    const { bbox, options } = bounds;

    if (flying) {
      this.map.off('moveend', this.onMoveEnd);
    }

    this.setState({ flying: true });

    requestAnimationFrame(() => {
      this.map.fitBounds(
        [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
        options
      );

      this.map.once('moveend', this.onMoveEnd);
    });
  };

  render() {
    const { customClass, children, getCursor, dragPan, dragRotate, ...mapboxProps } = this.props;
    const { viewport, flying, loaded } = this.state;

    return (
      <div
        ref={r => { this.mapContainer = r}}
        styleName="c-mapbox-map"
        className={classnames({
          [customClass]: !!customClass
        })}
      >
        <ReactMapGL
          ref={map => { this.map = map && map.getMap(); }}

          // CUSTOM PROPS FROM REACT MAPBOX API
          {...mapboxProps}

          // VIEWPORT
          {...viewport}
          width="100%"
          height="100%"

          // INTERACTIVE
          dragPan={dragPan && !flying}
          dragRotate={dragRotate && !flying}

          // DEFAULT FUC IMPLEMENTATIONS
          onViewportChange={!flying ? this.onViewportChange : null}
          onResize={this.onResize}
          onLoad={this.onLoad}
          getCursor={getCursor}
        >
          {loaded && (
            <Fragment>
              {!!this.map && typeof children === 'function' && children(this.map)}
            </Fragment>
          )}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapboxMap;