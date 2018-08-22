import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';

export class Spinner extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    className: null,
    style: null
  }

  render() {
    const { className, style } = this.props;
    const customClass = classnames({ [className]: !!className });

    return (
      <div styleName="c-spinner" style={style} className={customClass}>
        <div styleName="spinner-box">
          <div styleName="icon" />
        </div>
      </div>
    );
  }
}

export default Spinner;
