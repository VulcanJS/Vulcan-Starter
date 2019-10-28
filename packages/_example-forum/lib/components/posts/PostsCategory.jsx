import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import qs from 'qs';

const PostsCategory = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
  const path = '';
  const orderProperty = getOrderProperty(path);

  const input = { orderBy: { [orderProperty]: 'desc' } };
  return <Components.PostsList input={input} />;
};

PostsCategory.displayName = 'PostsCategory';

registerComponent({ name: 'PostsCategory', component: PostsCategory });
