import React from 'react';
import PropTypes from 'prop-types';
import { parse, changeset, View } from 'vega-lib';
import debounce from 'lodash/debounce';
import { capitalize, isDefined, isFunction } from './utils';

/* eslint-disable */
const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  spec: PropTypes.object.isRequired,
  logLevel: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  tooltip: PropTypes.func,
  background: PropTypes.string,
  padding: PropTypes.object,
  renderer: PropTypes.string,
  enableHover: PropTypes.bool,
  data: PropTypes.object,
  onNewView: PropTypes.func,
  onParseError: PropTypes.func,
  theme: PropTypes.object
};
/* eslint-enable */

const defaultProps = {
  className: null,
  style: {},
  theme: {},
  renderer: 'svg',
  enableHover: true,
  logLevel: 'warn',
  width: 400,
  height: 320,
  background: '',
  padding: 20,
  data: {},
  tooltip() {},
  onNewView() {},
  onParseError() {},
};

class Vega extends React.Component {

  static isSamePadding(a, b) {
    if (isDefined(a) && isDefined(b)) {
      return a.top === b.top
        && a.left === b.left
        && a.right === b.right
        && a.bottom === b.bottom;
    }
    return a === b;
  }

  static isSameData(a, b) {
    return a === b && !isFunction(a);
  }

  static isSameSpec(a, b) {
    return a === b
      || JSON.stringify(a) === JSON.stringify(b);
  }

  static listenerName(signalName) {
    return `onSignal${capitalize(signalName)}`;
  }

  constructor(props) {
    super(props);

    this.debouncedUpdateViewDimensions = debounce(() => this.updateViewDimensions(), 60);
  }

  componentDidMount() {
    const { spec } = this.props;

    this.createView(spec);
    if(this.view) this.setListeners();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { spec } = props;

    if (spec !== prevProps.spec) {
      this.clearView();
      this.createView(spec);
    } else if (this.view) {
      let changed = false;

      // update view properties
      [
        'width',
        'height',
        'renderer',
        'logLevel',
        'background',
      ]
        .filter(field => props[field] !== prevProps[field])
        .forEach((field) => {
          this.view[field](props[field]);
          changed = true;
        });

      if (!Vega.isSamePadding(props.padding, prevProps.padding)) {
        this.view.padding(props.padding || spec.padding);
        changed = true;
      }

      // update data
      if (spec.data && props.data) {
        spec.data.forEach((d) => {
          const oldData = prevProps.data[d.name];
          const newData = props.data[d.name];
          if (!Vega.isSameData(oldData, newData)) {
            this.updateData(d.name, newData);
            changed = true;
          }
        });
      }

      if (props.enableHover !== prevProps.enableHover) {
        changed = true;
      }

      if (changed) {
        if (props.enableHover) {
          this.view.hover();
        }
        this.view.run();
      }
    }
  }

  componentWillUnmount() {
    this.clearView();
  }


  setListeners() {
    const { spec } = this.props;
    if((spec.autosize || {}).type === 'fit') window.addEventListener('resize', this.debouncedUpdateViewDimensions);
  }

  removeListeners() {
    const { spec } = this.props;
    if((spec.autosize || {}).type === 'fit') window.removeEventListener('resize', this.debouncedUpdateViewDimensions);
  }

  createView(spec) {
    if (spec) {
      const { props } = this;
      const { theme, data, enableHover, onNewView, onParseError } = props;

      // Parse the vega spec and create the view
      try {
        const runtime = parse(spec, theme);
        const view = new View(runtime)
          .initialize(this.element);

        // Attach listeners onto the signals
        if (spec.signals) {
          spec.signals.forEach((signal) => {
            view.addSignalListener(signal.name, (...args) => {
              const listener = props[Vega.listenerName(signal.name)];
              if (listener) {
                listener.apply(this, args);
              }
            });
          });
        }

        // store the vega.View object to be used on later updates
        this.view = view;

        if((spec.autosize || {}).type === 'fit') this.updateViewDimensions(false);

        [
          'logLevel',
          'renderer',
          'tooltip',
          'background',
          'width',
          'height',
          'padding'
        ]
          .filter(field => isDefined(props[field]))
          .forEach((field) => { view[field](props[field]); });

        if (spec.data && data) {
          spec.data
            .filter(d => data[d.name])
            .forEach((d) => {
              this.updateData(d.name, data[d.name]);
            });
        }
        if (enableHover) {
          view.hover();
        }

        view.run();

        onNewView(view);
      } catch (ex) {
        this.clearView();
        onParseError(ex);
      }
    } else {
      this.clearView();
    }
    return this;
  }

  updateViewDimensions(forceRun = true) {
    if (!this.view) return;

    const containerWidth = this.view.container().getBoundingClientRect().width;

    this.view.width(containerWidth)

    if (forceRun) this.view.run();
  }

  updateData(name, value) {
    if (value) {
      if (isFunction(value)) {
        value(this.view.data(name));
      } else {
        this.view.change(
          name,
          changeset()
            .remove(() => true)
            .insert(value),
        );
      }
    }
  }

  clearView() {
    if (this.view) {
      this.view.finalize();
      this.removeListeners();
      this.view = null;
    }
    return this;
  }

  render() {
    const { style, className } = this.props;

    return (
      // Create the container Vega draws inside
      <div
        ref={(c) => { this.element = c; }}
        className={className}
        style={style}
      />
    );
  }

}

Vega.propTypes = propTypes;
Vega.defaultProps = defaultProps;

export default Vega;
