import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { postViews } from '../../modules/data.js';

const getOrderProperty = currentRoute => {
  const postView = postViews.find(({ name }) => name === currentRoute.name);
  return postView && postView.orderBy;
};

const PostsHome = ({ currentRoute }) => (
  <Components.PostsList input={{ limit: 3, orderBy: { [getOrderProperty(currentRoute)]: 'desc' } }} />
);

registerComponent({ name: 'PostsHome', component: PostsHome });
