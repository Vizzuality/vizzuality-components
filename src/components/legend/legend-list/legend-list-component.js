import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import LegendListItem from './legend-item';

class Legend extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    readonly: PropTypes.bool,
    interaction: PropTypes.bool,

    // FUNC
    onChangeLayer: PropTypes.func,
    onChangeOpacity: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    onRemoveLayer: PropTypes.func,
    onChangeInfo: PropTypes.func
  }

  static defaultProps = {
    items: [],
    readonly: false,
    interaction: false,

    onChangeLayer: () => {},
    onChangeOpacity: () => {},
    onChangeVisibility: () => {},
    onRemoveLayer: () => {},
    onChangeInfo: () => {}
  }

  render() {
    const { items } = this.props;

    return (
      <ul className="legend-list">
        {items.map((value, index) => (
          <LegendListItem
            key={index}
            index={index}
            value={value}
            readonly={this.props.readonly}
            interaction={this.props.interaction}
            onChangeInfo={this.props.onChangeInfo}
            onChangeLayer={this.props.onChangeLayer}
            onChangeOpacity={this.props.onChangeOpacity}
            onChangeVisibility={this.props.onChangeVisibility}
            onRemoveLayer={this.props.onRemoveLayer}
          />
        ))}
      </ul>
    );
  }
}

export default Legend;
