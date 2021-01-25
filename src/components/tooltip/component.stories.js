/* eslint-disable react/prop-types */
import React from 'react';
import Component from './index';

export default {
  title: 'Tooltip',
  argTypes: {
    trigger: {
      control: {
        type: 'select',
        options: [['click'], ['hover']],
      },
    },
  },
};

export const Tooltip = (props) => (
  <>
    <Component {...props}>
      <button type="button">{props.trigger[0] === 'click' ? 'Click' : 'Hover'} me</button>
    </Component>
  </>
);
Tooltip.args = {
  trigger: ['click'],
  overlay: <>JSX content</>,
  overlayClassName: 'c-rc-tooltip -default',
  overlayStyle: { color: '#fff' },
  placement: 'top',
  mouseLeaveDelay: 0,
  destroyTooltipOnHide: true,
};
