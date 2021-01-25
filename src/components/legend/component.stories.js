/* eslint-disable react/prop-types */
import React from 'react';
import Component from './index';
import { layerGroups } from './mocks';
import LegendListItem from './components/legend-list-item';
import LegendItemToolbar from './components/legend-item-toolbar';
import LegendItemTypes from './components/legend-item-types';
import LegendItemTimestep from './components/legend-item-timestep';
import Icons from 'components/icons';

const layerGroupsParsed = layerGroups.map((lg) => ({
  ...lg,
  layers: lg.layers.map((layer) => ({
    ...layer,
    ...(layer.layerConfig &&
      layer.layerConfig.timeline_config && {
        timelineParams: {
          ...layer.layerConfig.timeline_config,
          canPlay: false,
          minDate: '2001-01-01',
          maxDate: '2017-12-31',
          startDate: '2004-09-27',
          endDate: '2010-09-14',
          trimEndDate: '2016-09-14',
        },
      }),
  })),
}));

const Template = (props) => (
  <>
    <Icons />
    <Component {...props}>
      {layerGroupsParsed.map((lg, i) => (
        <LegendListItem index={i} key={lg.dataset} layerGroup={lg} toolbar={<LegendItemToolbar />}>
          <LegendItemTypes />
          <LegendItemTimestep
            handleChange={() => {}}
            trackStyle={[
              {
                backgroundColor: '#c32d7b',
                borderRadius: '0px',
              },
              {
                backgroundColor: '#F660AE',
                borderRadius: '0px',
              },
            ]}
          />
        </LegendListItem>
      ))}
    </Component>
  </>
);

export const basic = Template.bind({});
basic.storyName = 'Basic example';
basic.args = {};

export const constrained = Template.bind({});
constrained.storyName = 'Height and width contrained';
constrained.args = {
  maxWidth: 500,
  maxHeight: 300,
};

export const notDraggable = Template.bind({});
notDraggable.storyName = 'Items not draggable';
notDraggable.args = {
  sortable: false,
};

export const collapsed = Template.bind({});
collapsed.storyName = 'Collapsed by default';
collapsed.args = {
  expanded: false,
};
