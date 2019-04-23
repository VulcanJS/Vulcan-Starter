import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { Components } from 'meteor/vulcan:core';

// import the components
import 'meteor/example-forum'

// and then load them in the app so that <Component.Whatever /> is defined
import { populateComponentsApp, initializeFragments } from 'meteor/vulcan:lib';
// we need registered fragments to be initialized because populateComponentsApp will run
// hocs, like withUpdate, that rely on fragments
initializeFragments();
// actually fills the Components object
populateComponentsApp();



storiesOf('example-forum')
.add('PostsNoMore', () => (
    <Components.PostsNoMore />
))