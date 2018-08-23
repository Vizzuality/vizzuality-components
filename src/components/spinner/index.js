import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';

const STYLES = {
  box: {
    width: 40,
    height: 40
  },
  circle: {
    fill: 'none',
    stroke: '#000',
    strokeWidth: 5,
    strokeMiterlimit: 10
  }
};

export class Spinner extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    customClass: PropTypes.string,
    style: PropTypes.shape({
      box: PropTypes.object,
      circle: PropTypes.object
    })
  }

  static defaultProps = {
    className: null,
    customClass: null,
    style: {
      box: {},
      circle: {}
    }
  }

  render() {
    const { className, customClass, style } = this.props;
    const classNames = classnames({
      'c-spinner': true,
      [className]: !!className
    });

    const customClassNames = classnames({
      'c-spinner': true,
      [customClass]: !!customClass
    });

    return (
      <div styleName={classNames} className={customClassNames}>
        <div styleName="spinner-box" style={{ ...STYLES.box, ...style.box }}>
          <svg styleName="spinner-icon" viewBox="25 25 50 50">
            <circle
              {...{ ...STYLES.circle, ...style.circle}}
              styleName="spinner-circle"
              cx={50}
              cy={50}
              r={20}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default Spinner;
