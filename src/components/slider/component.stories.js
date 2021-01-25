/* eslint-disable react/prop-types */
import React from 'react';
import Component from './index';

export default {
  title: 'Slider',
  component: Component,
};

const Template = (props) => {
  const [value, setValue] = React.useState(props.defaultValue);
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
};
