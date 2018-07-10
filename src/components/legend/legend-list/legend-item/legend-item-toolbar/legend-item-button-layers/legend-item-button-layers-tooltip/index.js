import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

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

    return (
      <div>
        Layers

        <ul className={theme.layersList}>
          {layers.map(l => (
            <li
              key={l.id}
              className={cx(
                theme.layersListItem,
                l.id === activeLayer.id ? theme.active : null
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

export default themr('LegendLayersTooltip', styles)(LegendLayersTooltip);
