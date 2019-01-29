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

  render() {
    const { activeLayer } = this.props;
    const { selectedOption } = this.props;
    const { layerConfig } = activeLayer;
    const customStyles = {

      borderBottom: '1px dotted pink',
      color: 'blue',
      padding: 20,
    }


    if (!layerConfig.uiConfig || !layerConfig.uiConfig.find(item => item.type === "select")) return null;

    const options = layerConfig.uiConfig.find(item => item.type === "select").data.items;

    return (
      <div styleName="c-legend-select">
        <Select
          placeholder="Select an option"
          onChange={selectedOption}
          onChangeLanguage
          options={options}
          {...this.props}
          styles={customStyles}
        />
      </div>
    );
  }
}

export default LegendItemTypeSelect;
