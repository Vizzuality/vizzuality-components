import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Spinner from 'components/spinner';

import { replace } from 'layer-manager';

export class PopupExample extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  componentDidMount() {
    const { data } = this.props;

    const {
      latlng,
      interactions,
      interactionsLayer,
      interactionsSelected
    } = data;
    

    if (
      !!interactionsLayer.interactionConfig.config &&
      !!interactionsLayer.interactionConfig.config.url
    ) {
      fetch(replace(interactionsLayer.interactionConfig.config.url, latlng))
        .then((response) => {
          console.log('response');
        })
    }
  }

  render() {
    const { data } = this.props;
    const { interactions, interactionsLayer, interactionsSelected } = data;

    if (!!interactions[interactionsSelected] && !!interactions[interactionsSelected].data) {
      return (
        <table>
          <tbody>
            {interactionsLayer.interactionConfig.output.map(o => {
              const { data: d } = interactions[interactionsSelected];

              if (!d) {
                return 'No data';
              }

              return (
                <tr key={o.property || o.column}>
                  <td>
                    {o.property || o.column}
                  </td>
                  <td>
                    {d[o.column]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    if (
      !!interactions[interactionsSelected] &&
      !interactions[interactionsSelected].data &&
      !!interactionsLayer.interactionConfig.config &&
      !!interactionsLayer.interactionConfig.config.url
    ) {
      return <Spinner style={{ position: 'relative', minHeight: 75 }} />;
    }

    return 'No data';
  }
}

export default PopupExample;
