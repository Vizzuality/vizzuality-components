import React from 'react';
import PropTypes from 'prop-types';
import Vega from '../index';
import configSpec from './theme.json';

const VegaThumbnail = (props) => {
  const { width, height, data, spec, theme } = props;

  return (
    <Vega
      width={width}
      height={height}
      data={data}
      spec={spec}
      theme={theme || configSpec}
    />
  );
};

VegaThumbnail.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object,
  spec: PropTypes.object,
  theme: PropTypes.object
};

VegaThumbnail.defaultProps = {
  width: 200,
  height: 180
};

export default VegaThumbnail;
