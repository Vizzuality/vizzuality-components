import React from 'react';
import Icons from 'components/icons';
import Component from './index';

export default {
  title: 'Icon',
};

export const Icon = (props) => (
  <>
    <Icons />
    <Component {...props} />
  </>
);
Icon.args = {
  name: 'icon-search',
  className: '-small',
  style: {},
};
