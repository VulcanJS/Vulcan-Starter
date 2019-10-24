import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import qs from 'qs';

const PostsHome = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
  const terms = isEmpty(query) ? { view: 'top' } : query;
  return <Components.PostsList terms={terms} />;
};

PostsHome.displayName = 'PostsHome';

registerComponent({ name: 'PostsHome', component: PostsHome });
