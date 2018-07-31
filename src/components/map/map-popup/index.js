import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import isEqual from 'lodash/isEqual';

const { L } = (typeof window !== 'undefined') ? window : {};

export class MapPopup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    map: PropTypes.object.isRequired,
    latlng: PropTypes.object,
    data: PropTypes.object,
    onReady: PropTypes.func
  }

  static defaultProps = {
    latlng: {},
    data: {},
    onReady: () => {}
  }

  componentDidMount() {
    if (typeof L === 'undefined') {
      return;
    }

    this.popup = this.popup || L.popup({
      maxWidth: 400,
      minWidth: 240
    });

    this.props.onReady(this.popup);
  }

  componentDidUpdate(prevProps) {
    const {
      latlng: prevLatLng,
      data: prevData
    } = prevProps;

    const {
      latlng: nextLatLng,
      data: nextData
    } = this.props;

    if (!isEqual(prevLatLng, nextLatLng)) {
      this.setPopup();
    }

    if (!isEqual(prevData, nextData)) {
      this.updatePopup();
    }
  }

  setPopup = () => {
    const { map, latlng } = this.props;

    this.popup
      .setLatLng(latlng)
      .setContent(this.buildPopup())
      .openOn(map);
  }

  buildPopup = () => {
    const popupComponent = document.createElement('div');

    render(
      React.Children.map(this.props.children, child => (React.isValidElement(child) && typeof child.type !== 'string' ?
        React.cloneElement(child, {
          ...this.props,
          popup: this.popup
        })
        :
        child
      )),
      popupComponent
    );
    return popupComponent;
  }

  updatePopup = () => {
    this.popup.setContent(this.buildPopup());
  }

  removePopup = () => {
    this.popup.remove();
  }

  render() {
    return null;
  }
}

export default MapPopup;
