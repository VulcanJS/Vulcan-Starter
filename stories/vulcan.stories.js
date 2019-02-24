import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { Components, coreComponents, getMockProps } from 'meteor/vulcan:core';

coreComponents.forEach(componentName => {
  const Component = Components[componentName];
  if (Component) {
    storiesOf(componentName, module)
    .add('Horizontal Layout', () => <Component {...getMockProps(componentName)} />)
    .add('Input Only', () => <Component {...getMockProps(componentName, { itemProperties: { layout: 'inputOnly'}})} />);
  }
});