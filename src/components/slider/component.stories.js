/* eslint-disable react/prop-types */
import React from 'react';
import Component from './index';

export default {
  title: 'Slider',
  component: Component,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
};

const Template = ({ defaultValue, ...props }) => {
  const [value, setValue] = React.useState(defaultValue);
  return <Component {...props} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.storyName = 'Single thumb';
Default.args = {
  min: 0,
  max: 100,
  defaultValue: 50,
  trackStyle: {
    backgroundColor: '#c32d7b',
    borderRadius: '0px',
  },
  handleStyle: {
    backgroundColor: '#c32d7b',
    borderRadius: '10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
    border: '0px',
    zIndex: 2,
  },
  railStyle: { backgroundColor: '#d9d9d9' },
  dotStyle: { visibility: 'hidden', border: '0px' },
};

export const Range = Template.bind({});
Range.storyName = 'Multi thumb';
Range.args = {
  min: 0,
  max: 100,
  range: true,
  defaultValue: [25, 75],
  trackStyle: {
    backgroundColor: '#c32d7b',
    borderRadius: '0px',
  },
  handleStyle: {
    backgroundColor: '#c32d7b',
    borderRadius: '10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
    border: '0px',
    zIndex: 2,
  },
  railStyle: { backgroundColor: '#d9d9d9' },
  dotStyle: { visibility: 'hidden', border: '0px' },
};
