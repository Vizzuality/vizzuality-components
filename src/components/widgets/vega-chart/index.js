import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { parse, changeset, View } from 'vega-lib';
import vegaTooltip from 'vega-tooltip';
import { capitalize, isDefined, isFunction } from './utils';

// Opimized resize
(() => {
  const throttle = (type, name, objOriginal) => {
    if (typeof window === 'undefined') return;
    const obj = objOriginal || window;
    let running = false;
    const func = () => {
      if (running) return;
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle('resize', 'optimizedResize');
})();

/* eslint-disable */
const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  spec: PropTypes.object.isRequired,
  logLevel: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  tooltip: PropTypes.bool,
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
  className: '',
  tooltip: true,
  renderer: 'svg',
  enableHover: true,
  onNewView() {},
  onParseError() {},
};

class Vega extends PureComponent {

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

  componentDidMount() {
    const { spec } = this.props;
    this.createView(spec);
    if(this.view) this.setListeners();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { spec } = this.props;

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
    if((spec.autosize || {}).type === 'fit') {
      if (typeof window === 'undefined') return;
      window.addEventListener('optimizedResize', this.updateViewDimensions.bind(this));
    }
  }

  removeListeners() {
    const { spec } = this.props;
    if((spec.autosize || {}).type === 'fit') {
      if (typeof window === 'undefined') return;
      window.removeEventListener('optimizedResize', this.updateViewDimensions.bind(this));
    }
  }

  calculateSize() {
    if (this.view) return this.view.container().getBoundingClientRect();
    return {};
  }

  updateViewDimensions(forceRun = true) {
    if (!this.view) return;

    const { props, view } = this;
    const { width } = this.calculateSize();


    if (!props.width) view.width(width);

    if (forceRun) view.run();
  }

  createView(spec) {
    const nextSpec = { ...spec };

    if (nextSpec) {
      const { props } = this;

      // Parse the vega spec and create the view
      try {
        const runtime = parse(nextSpec, props.theme);
        const view = new View(runtime)
          .initialize(this.element);

        // Attach listeners onto the signals
        if (nextSpec.signals) {
          nextSpec.signals.forEach((signal) => {
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

        [
          'logLevel',
          'renderer',
          'background',
          'width',
          'height',
          'padding'
        ]
          .filter(field => isDefined(props[field]))
          .forEach((field) => { view[field](props[field]); });

        const { width, height } = this.calculateSize();

        if (!props.width) {
          nextSpec.width = width;
          view.width(width);
        }

        if (!props.height) {
          nextSpec.height = height;
          view.height(height);
        }

        if (nextSpec.data && props.data) {
          nextSpec.data
            .filter(d => props.data[d.name])
            .forEach((d) => {
              this.updateData(d.name, props.data[d.name]);
            });
        }

        if (props.enableHover) view.hover();

        if (props.tooltip) vegaTooltip(view);

        view.run();

        props.onNewView(view);
      } catch (ex) {
        this.clearView();
        props.onParseError(ex);
      }
    } else {
      this.clearView();
    }
    return this;
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
    const { className, style } = this.props;

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
