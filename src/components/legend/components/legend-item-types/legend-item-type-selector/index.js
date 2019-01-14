import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './styles.scss';

class LegendItemTypeSelector extends PureComponent {
  static propTypes = { activeLayer: PropTypes.object };

  static defaultProps = { activeLayer: {} };

  // state = { selectedOption: 0 };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    // const { selectedOption } = this.state;
    const { activeLayer } = this.props;
    const { layerConfig } = activeLayer;

    // TO-DO: loopear para ver que tipo es select
    if (!layerConfig.uiConfig || layerConfig.uiConfig[0].type !== 'select') return null;

    const options = layerConfig.uiConfig[0].data.items;

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

export default LegendItemTypeSelector;
