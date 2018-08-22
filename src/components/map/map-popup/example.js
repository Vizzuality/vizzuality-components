import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/spinner';

import { replace } from 'layer-manager';

export class PopupExample extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  state = {
    loading: true,
    data: null
  }

  componentDidMount() {
    const { data } = this.props;

    const {
      latlng,
      interactionsLayer
    } = data;
    

    if (
      !!interactionsLayer.interactionConfig.config &&
      !!interactionsLayer.interactionConfig.config.url
    ) {
      fetch(replace(interactionsLayer.interactionConfig.config.url, latlng))
        .then((response) => {
          if (response.ok) return response.json();
          throw response;
        })
        .then(({ data: d }) => {
          this.setState({
            data: d[0],
            loading: false
          })
        })
        .catch((err) => {
          this.setState({ loading: false });

          if (err && err.json && typeof err.json === 'function') {
            err.json()
              .then((er) => {
                console.error(er);
              })
          }
        })
    }
  }

  render() {
    const { data } = this.props;
    const { data: stateData, loading } = this.state;
    const { interactions, interactionsLayer, interactionsSelected } = data;

    const currentData = interactions[interactionsSelected].data || stateData;

    if (currentData) {
      return (
        <table>
          <tbody>
            {interactionsLayer.interactionConfig.output.map(o => {
              if (!currentData) {
                return 'No data';
              }

              return (
                <tr key={o.property || o.column}>
                  <td>
                    {o.property || o.column}
                  </td>
                  <td>
                    {currentData[o.column]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    if (
      loading &&
      !!interactionsLayer.interactionConfig.config &&
      !!interactionsLayer.interactionConfig.config.url
    ) {
      return <Spinner style={{ position: 'relative', minHeight: 75 }} />;
    }

    return 'No data';
  }
}

export default PopupExample;
