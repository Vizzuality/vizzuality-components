import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

// Components
import InputRange from 'components/form/input-range';

// Styles
import styles from './styles.scss';

class LegendOpacityTooltip extends React.Component {
  static propTypes = {
    // Layers
    activeLayer: PropTypes.object.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    // Callback to call when the layer changes with
    // the ID of the dataset and the ID of the layer
    onChangeOpacity: PropTypes.func.isRequired
  };

  static defaultProps = {
    min: 0,
    max: 1,
    step: 0.01
  }

  state = { value: this.props.activeLayer.opacity || 1 }

  onChange = (v) => {
    const { activeLayer } = this.props;

    this.setState({ value: v });
    this.props.onChangeOpacity(activeLayer, v);
  }

  render() {
    const { min, max, step } = this.props;
    const { value } = this.state;

    return (
      <div styleName="c-legend-item-button-opacity-tooltip" ref={(node) => { this.el = node; }}>
        Opacity

        <div styleName="slider-tooltip-container">
          <InputRange
            minValue={min}
            maxValue={max}
            step={step}
            value={value}
            formatLabel={(v, string) => {
              if (string === 'value') {
                return null;
              }

              return v.toFixed(2);
            }}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default CSSModules(LegendOpacityTooltip, styles, { allowMultiple: true });
