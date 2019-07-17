import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import sortBy from 'lodash/sortBy';
import Range from 'components/form/range';
import Tooltip from 'components/tooltip';
import Slider from 'rc-slider';

// Styles
import './styles.scss';

class LegendItemTimeline extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    dragging: PropTypes.bool,
    index: PropTypes.number,
    customClass: PropTypes.string,
    layers: PropTypes.array,
    trackStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
    handleStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
    railStyle: PropTypes.shape({}),
    dotStyle: PropTypes.shape({}),
    activeDotStyle: PropTypes.shape({}),
    markStyle: PropTypes.shape({}),
    onChangeLayer: PropTypes.func.isRequired
  }

  static defaultProps = {
    layers: [],
    value: 0,
    dragging: false,
    index: 0,
    customClass: null,
    trackStyle: null,
    handleStyle: null,
    railStyle: null,
    dotStyle: null,
    activeDotStyle: null,
    markStyle: {}
  }

  state = {
    step: null,
    playing: false
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

  setPlay = (playing, first, last) => {
    const { step } = this.state;
    const { onChangeLayer } = this.props;
    const timelineLayers = this.getTimelineLayers();

    if (this.timer) clearInterval(this.timer);

    if (playing) {
      this.timer = setInterval(() => {
        const newStep = step || first;

        if (newStep === last) {
          clearInterval(this.timer);

          const currentLayer = timelineLayers[0];
          onChangeLayer(currentLayer);

          return this.setState({
            step: null,
            playing: false
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

    this.setState({ playing });
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
    const {
      trackStyle,
      handleStyle,
      railStyle,
      dotStyle,
      activeDotStyle,
      markStyle,
      customClass
    } = this.props;
    const { step } = this.state;
    const externalClass = classnames({ [customClass]: !!customClass });
    const timelineLayers = this.getTimelineLayers();

    // Return null if timeline doesn not exist
    if (!timelineLayers.length) return null;

    const timelineMarks = {};

    timelineLayers.forEach((val, index) => {
      const isVisible = (index === 0  || index === timelineLayers.length - 1);
      timelineMarks[val.layerConfig.timelineLabel] =  {
        label: val.layerConfig.timelineLabel,
        style: {
          ...markStyle,
          visibility: isVisible ? 'visible' : 'hidden'
        }
      }
    });

    const first = timelineLayers[0].layerConfig.order;
    const last = timelineLayers[timelineLayers.length - 1].layerConfig.order;
    const activeLayer = timelineLayers.find(_layer => _layer.active);
    const defaultValue = activeLayer ? activeLayer.layerConfig.order : first;

    return (
      <div
        styleName="c-legend-timeline"
        className={externalClass}
      >
        {/* {this.state.playing &&
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

        {/* {!this.state.playing &&
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
          step={null}
          handle={this.renderHandle}
          marks={timelineMarks}
          defaultValue={defaultValue}
          value={step || defaultValue}
          onAfterChange={(nextStep) => { this.setStep(nextStep); }}
          {...trackStyle && { trackStyle }}
          {...railStyle && { railStyle }}
          {...handleStyle && { handleStyle }}
          {...dotStyle && { dotStyle }}
          {...activeDotStyle && { activeDotStyle }}
        />
      </div>
    );
  }
}

export default LegendItemTimeline;
