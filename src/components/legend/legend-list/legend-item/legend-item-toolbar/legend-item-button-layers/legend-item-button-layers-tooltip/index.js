import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styles
import styles from './styles.scss';

class LegendLayersTooltip extends React.Component {
  static propTypes = {
    // Layers
    layers: PropTypes.array.isRequired,
    activeLayer: PropTypes.object.isRequired,
    // Callback to call when the layer changes with
    // the ID of the dataset and the ID of the layer
    onChangeLayer: PropTypes.func.isRequired
  };

  render() {
    const { layers, activeLayer, theme } = this.props;
    const style = { ...styles, ...theme };

    return (
      <div>
        Layers

        <ul className={style.layersList}>
          {layers.map(l => (
            <li
              key={l.id}
              className={cx(
                styles.layersListItem,
                l.id === activeLayer.id ? styles.active : null
              )}
              onClick={() => this.props.onChangeLayer(l)}
            >
              {l.name}
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default LegendLayersTooltip;
