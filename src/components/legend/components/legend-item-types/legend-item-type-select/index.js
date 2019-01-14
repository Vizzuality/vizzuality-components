import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './styles.scss';

class LegendItemTypeSelect extends PureComponent {
  static propTypes = {
    activeLayer: PropTypes.object,
    selectedOption: PropTypes.object,
  }.isRequired;

  static defaultProps = { activeLayer: {} };

  // state = { selectedOption: 0 };

  handleChange = selectedOption => {
    this.props.onChange(selectedOption);
  };

  render() {
    const { activeLayer } = this.props;
    const { layerConfig } = activeLayer;


    if (!layerConfig.uiConfig || !layerConfig.uiConfig.find(item => item.type === "select")) return null;

    const options = layerConfig.uiConfig.find(item => item.type === "select").data.items;

    return (
      <div styleName="c-legend-select">
        <Select
          placeholder="Select an option"
          onChange={this.handleChange}
          options={options}
          {...this.props}
        />
      </div>
    );
  }
}

export default LegendItemTypeSelect;
