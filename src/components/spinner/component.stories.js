import React from 'react';
import Component from './index';

export default {
  title: 'Spinner',
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: ['relative', 'absolute', 'fixed'],
      },
    },
  },
};

export const Spinner = (props) => <Component {...props} />;
Spinner.args = {
  position: 'relative',
  customClass: 'custom-spinner',
  style: {
    box: { width: 20, height: 20 },
    circle: { stroke: '#F00', strokeWidth: 8 },
  },
};
