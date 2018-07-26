import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

import Icon from 'components/icon';

import styles from './styles.scss';

export class ZoomControl extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  static defaultProps = { className: null }

  state = { zoom: this.props.map.getZoom() }

  componentWillMount() {
    this.props.map.on('zoomend', () => {
      this.setState({ zoom: this.props.map.getZoom() });
    });
  }

  componentWillUnmount() {
    this.props.map.off('zoomend');
  }

  increaseZoom = () => {
    const zoom = this.props.map.getZoom();
    const maxZoom = this.props.map.getMaxZoom();

    this.setState({ zoom: zoom === maxZoom ? zoom : zoom + 1 }, () => {
      this.props.map.setZoom(this.state.zoom);
    });
  }

  decreaseZoom = () => {
    const zoom = this.props.map.getZoom();
    const minZoom = this.props.map.getMinZoom();

    this.setState({ zoom: zoom === minZoom ? zoom : zoom - 1 }, () => {
      this.props.map.setZoom(this.state.zoom);
    });
  }

  render() {
    const { className } = this.props;
    const { zoom } = this.state;
    const maxZoom = this.props.map.getMaxZoom();
    const minZoom = this.props.map.getMinZoom();

    const classNames = classnames({ [className]: !!className });

    const zoomInClass = classnames('zoom-control-btn', { '-disabled': zoom === maxZoom });
    const zoomOutClass = classnames('zoom-control-btn', { '-disabled': zoom === minZoom });

    return (
      <div styleName="c-zoom-control" className={classNames}>
        <button
          styleName={zoomInClass}
          type="button"
          disabled={zoom === maxZoom}
          onClick={this.increaseZoom}
        >
          <Icon name="icon-plus" />
        </button>
        <button
          styleName={zoomOutClass}
          type="button"
          disabled={zoom === minZoom}
          onClick={this.decreaseZoom}
        >
          <Icon name="icon-minus" />
        </button>
      </div>
    );
  }
}

export default CSSModules(ZoomControl, styles, { allowMultiple: true });
