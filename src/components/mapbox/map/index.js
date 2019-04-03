import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import ReactMapGL from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

import './styles.scss';


class MapboxMap extends Component {
  events = {}

  static propTypes = {
    /** A function that returns the map instance */
    children: PropTypes.func,
    /** Custom css class for styling */
    customClass: PropTypes.string,
    /** A function that exposes the viewport
     * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
    */
    viewport: PropTypes.shape({}),
    bounds: PropTypes.shape({
      bbox: PropTypes.array,
      options: PropTypes.shape({})
    }),
    /** A function that exposes the viewport */
    onViewportChange: PropTypes.func,
    getCursor: PropTypes.func
  }

  static defaultProps = {
    children: null,
    customClass: null,
    viewport: {
      zoom: 2,
      lat: 0,
      lng: 0
    },
    bounds: {},

    onViewportChange: () => {},
    getCursor: ({ isHovering, isDragging }) => {
      if (isHovering) return 'pointer';
      if (isDragging) return 'grabbing';
      return 'grab';
    }
  }

  state = {
    viewport: {
      ...this.props.viewport // eslint-disable-line
    },
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
      this.setState({
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

  onLoad = () => {
    const { onLoad } = this.props;

    this.setState({ loaded: true });
    onLoad();
  }

  fitBounds = () => {
    const { bounds } = this.props;
    const { bbox, options } = bounds;

    const { viewport } = this.state;
    const {
      width = this.mapContainer.clientWidth,
      height = this.mapContainer.clientHeight
    } = viewport;

    const webMercatorViewport = new WebMercatorViewport({ width, height });
    const newViewport = webMercatorViewport.fitBounds(
      [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
      options
    );

    this.setState({ viewport: newViewport });
  };

  render() {
    const { customClass, children, getCursor, ...mapboxProps } = this.props;
    const { viewport, loaded } = this.state;

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

          {...mapboxProps}

          // VIEWPORT
          {...viewport}
          width="100%"
          height="100%"

          // mapOptions={mapOptions}
          onViewportChange={this.onViewportChange}
          onResize={this.onResize}
          onLoad={this.onLoad}
          getCursor={getCursor}
          // onClick={handleMapInteraction}
          // interactiveLayerIds={interactiveLayers}
        >
          {loaded && (
            <Fragment>
              <h1>I'm a tittle</h1>
            </Fragment>
          )}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapboxMap;