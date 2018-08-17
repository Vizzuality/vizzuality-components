import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';

// styles
import styles from './styles.scss';

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

export default CSSModules(Spinner, styles, { allowMultiple: true });