import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { postViews } from '../../modules/data.js';

const getOrderProperty = currentRoute => {
  const postView = postViews.find(({ name }) => name === currentRoute.name);
  return postView && postView.sort;
};

const PostsHome = ({ currentRoute }) => (
  <Components.PostsList input={{ sort: { [getOrderProperty(currentRoute)]: 'desc' } }} />
);

registerComponent({ name: 'PostsHome', component: PostsHome });
