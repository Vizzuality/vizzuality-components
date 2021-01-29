/* eslint-disable react/prop-types */
import React from 'react';
import Component from './index';
import Icons from 'components/icons';

export default {
  title: 'Timestep',
  component: Component,
  decorators: [
    (Story) => (
      <div>
        <p>
          Based on rc-slider, for more configuration, take a look at the offical{' '}
          <a
            href="https://github.com/react-component/slider/tree/8.x"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation
          </a>
          .
        </p>
        <Icons />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    start: {
      control: {
        disable: true,
      },
    },
    end: {
      control: {
        disable: true,
      },
    },
    trim: {
      control: {
        disable: true,
      },
    },
  },
};

export const Default = ({ defaultValue, ...props }) => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Component
      {...props}
      start={value[0]}
      end={value[1]}
      value={value[1]}
      handleOnChange={setValue}
    />
  );
};
Default.storyName = 'Single thumb';
Default.args = {
  min: 0,
  max: 100,
  defaultValue: [0, 50],
  trackStyle: [
    {
      backgroundColor: '#c32d7b',
      borderRadius: '0px',
    },
  ],
  railStyle: { backgroundColor: '#d9d9d9' },
  handleStyle: {
    backgroundColor: '#c32d7b',
    borderRadius: '10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
    border: '0px',
    zIndex: 2,
  },
  range: false,
  canPlay: true,
  formatValue: (value) => `${value}%`,
  trim: 100,
  step: 1,
  speed: 200,
  marks: {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  },
};

export const Range = ({ defaultValue, ...props }) => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Component
      {...props}
      start={value[0]}
      end={value[1]}
      trim={value[2]}
      handleOnChange={setValue}
    />
  );
};
Range.storyName = 'Multi thumb';
Range.args = {
  min: 0,
  max: 100,
  defaultValue: [25, 50, 75],
  trackStyle: [
    {
      backgroundColor: '#c32d7b',
      borderRadius: '0px',
    },
    {
      backgroundColor: '#F660AE',
      borderRadius: '0px',
    },
  ],
  railStyle: { backgroundColor: '#d9d9d9' },
  handleStyle: {
    backgroundColor: '#c32d7b',
    borderRadius: '10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
    border: '0px',
    zIndex: 2,
  },
  range: true,
  canPlay: true,
  formatValue: (value) => `${value}%`,
  minGap: 5,
  maxGap: 20,
  step: 1,
  speed: 200,
  marks: {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  },
};
