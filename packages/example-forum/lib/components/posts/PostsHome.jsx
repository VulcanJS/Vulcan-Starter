import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { postViews } from '../../modules/data.js';
import qs from 'qs';

const getOrderProperty = currentRoute => {
  const postView = postViews.find(({ name }) => name === currentRoute.name);
  return postView && postView.sort;
};

const PostsHome = ({ currentRoute, location = {} }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
  const { search } = query;
  return <Components.PostsList input={{ search, sort: { [getOrderProperty(currentRoute)]: 'desc' } }} />;
};

registerComponent({ name: 'PostsHome', component: PostsHome });
