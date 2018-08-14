import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import Icon from 'components/icon';

import styles from './styles.scss';

const { L } = (typeof window !== 'undefined') ? window : {};

const EVENTS = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop',
};

export class DrawControl extends PureComponent {
  static propTypes = {
    /** Map instance */
    map: PropTypes.object.isRequired,
    className: PropTypes.string,
    customClass: PropTypes.string,

    /**
     * Leaflet draw options
     * @see Check https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#drawoptions
    */
    draw: PropTypes.shape({
      polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }),

    /**
     * Leaflet edit options
     * @see Check https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#editpolyoptions
    */
    edit: PropTypes.shape({
      edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      allowIntersection: PropTypes.bool,
    }),

    // Functions
    onDrawComplete: PropTypes.func,
    ...Object.keys(EVENTS).reduce((acc, val) => {
      acc[val] = PropTypes.func;
      return acc;
    }, {})
  }

  static defaultProps = {
    className: null,
    customClass: null,

    draw: {},
    edit: {},

    // Functions
    onDrawComplete: () => {},
    ...Object.keys(EVENTS).reduce((acc, val) => {
      acc[val] = () => {};
      return acc;
    }, {})
  }

  componentDidMount() {
    const { map } = this.props;

    // Layer group
    this.LAYER_GROUP = new L.FeatureGroup();
    map.addLayer(this.LAYER_GROUP);

    // Add events
    map.on('draw:created', this.onDrawComplete);

    Object.keys(EVENTS).forEach((k) => {
      if (this.props[k]) {
        map.on(EVENTS[k], this.props[k]);
      }
    })

  }

  componentWillUnmount() {
    const { map } = this.props;

    // Remove events
    map.off('draw:created', this.onDrawComplete);

    Object.keys(EVENTS).forEach((k) => {
      if (this.props[k]) {
        map.off(EVENTS[k], this.props[k]);
      }
    })
  }

  onDrawComplete = (e) => {
    const { map, edit } = this.props;

    this.DRAW_TYPE.disable();
    this.LAYER_GROUP.addLayer(e.layer);
    this.props.onDrawComplete && this.props.onDrawComplete(e);

    this.EDIT = new L.EditToolbar.Edit(map, {
      featureGroup: this.LAYER_GROUP,
      selectedPathOptions: L.EditToolbar.prototype.options.edit.selectedPathOptions,
      ...edit
    });

    this.EDIT.enable();
  }

  onDrawPolygon = () => {
    const { map, draw } = this.props;
    this.DRAW_TYPE = new L.Draw.Polygon(map, draw.polygon)
    this.DRAW_TYPE.enable();
  }

  render() {
    const { className, customClass } = this.props;

    const componentClass = classnames(
      'c-draw-control',
      { [className]: !!className }
    );
    const externalClass = classnames({ [customClass]: !!customClass });

    return (
      <div styleName={componentClass} className={externalClass}>
        <button
          type="button"
          onClick={this.onDrawPolygon}
        >
          <Icon name="icon-widgets" />
        </button>
      </div>
    );
  }
}

export default CSSModules(DrawControl, styles, { allowMultiple: true });
