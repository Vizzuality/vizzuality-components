import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Range from 'components/form/range';
import './styles.scss';

class LegendOpacityTooltip extends PureComponent {
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

  onChange = (v) => {
    const { activeLayer, onChangeOpacity } = this.props;
    onChangeOpacity(activeLayer, v);
  }

  render() {
    const { min, max, step, activeLayer: { opacity }, ...rest } = this.props;

    return (
      <div styleName="c-legend-item-button-opacity-tooltip" ref={(node) => { this.el = node; }}>
        Opacity

        <div styleName="slider-tooltip-container">
          <Range
            marks={{
              [min]: '0%',
              [max]: '100%'
            }}
            min={min}
            max={max}
            step={step}
            value={opacity}
            onAfterChange={this.onChange}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default LegendOpacityTooltip;
