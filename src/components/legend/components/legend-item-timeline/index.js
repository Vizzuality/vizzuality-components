import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import sortBy from 'lodash/sortBy';
import Range from 'components/form/range';
import Tooltip from 'components/tooltip';
import Slider from 'rc-slider';

// Styles
import './styles.scss';

class LegendItemTimeline extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    dragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    layers: PropTypes.array,
    onChangeLayer: PropTypes.func.isRequired
  }

  static defaultProps = { layers: [] }

  state = {
    step: null,
    isPlaying: false
  }

  /**
   * HELPERS
   * - getTimelineLayers
  */
  getTimelineLayers = () => {
    const { layers } = this.props;

    return sortBy(
      layers.filter(l => l.layerConfig.timeline),
      l => l.layerConfig.order
    );
  }

  setPlay = (isPlaying, first, last) => {
    const { step } = this.state;
    const { onChangeLayer } = this.props;
    const timelineLayers = this.getTimelineLayers();

    if (this.timer) clearInterval(this.timer);

    if (isPlaying) {
      this.timer = setInterval(() => {
        const newStep = step || first;

        if (newStep === last) {
          clearInterval(this.timer);

          const currentLayer = timelineLayers[0];
          onChangeLayer(currentLayer);

          return this.setState({
            step: null,
            isPlaying: false
          });
        }

        const currentLayer = timelineLayers.find(l =>
          l.layerConfig.order === newStep);
        const currentIndex = timelineLayers.findIndex(l =>
          l.layerConfig.order === newStep);

        requestAnimationFrame(() => {
          onChangeLayer(currentLayer);
        });

        return this.setState({ step: timelineLayers[currentIndex + 1].layerConfig.order });
      }, 3000, true);
    }

    this.setState({ isPlaying });
  }

  setStep = debounce((step) => {
    const { onChangeLayer } = this.props;
    const timelineLayers = this.getTimelineLayers();

    const currentLayer = timelineLayers.find(l =>
      l.layerConfig.order === step);

    if (currentLayer) onChangeLayer(currentLayer);
  }, 500)

  renderHandle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    const { Handle } = Slider;

    return (
      <Tooltip
        overlayClassName="c-rc-tooltip -default"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  render() {
    const { step } = this.state;
    const timelineLayers = this.getTimelineLayers();

    // Return null if timeline doesn not exist
    if (!timelineLayers.length) return null;

    const first = timelineLayers[0].layerConfig.order;
    const last = timelineLayers[timelineLayers.length - 1].layerConfig.order;

    return (
      <div styleName="c-legend-timeline">
        {/* {this.state.isPlaying &&
          <button
            styleName="timeline-play-button"
            type="button"
            onClick={() => {
              this.setPlay(false, first, last);
            }}
          >
            <Icon name="icon-stop2" className="-small" />
          </button>
        } */}

        {/* {!this.state.isPlaying &&
          <button
            styleName="timeline-play-button"
            type="button"
            onClick={() => {
              this.setPlay(true, first, last);
            }}
          >
            <Icon name="icon-play3" className="-small" />
          </button>
        } */}

        <Range
          min={first}
          max={last}
          handle={this.renderHandle}
          marks={[first, last].reduce((acc, val) =>
            ({ ...acc, [val]: val })
          , {} )}
          value={step || first}
          onAfterChange={(nextStep) => {
            this.setState({ step: nextStep });
            this.setStep(nextStep);
          }}
        />
      </div>
    );
  }
}

export default LegendItemTimeline;
