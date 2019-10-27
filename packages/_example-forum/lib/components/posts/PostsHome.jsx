import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import qs from 'qs';

const getOrderProperty = path => {
  switch (path) {
    case '':
      return 'score';
    case 'top':
      return 'baseScore';
    case 'new':
      return 'postedAt';
  }
};

const PostsHome = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
  const path = '';
  const orderProperty = getOrderProperty(path);

  const input = { orderBy: { [orderProperty]: 'desc' } };
  return <Components.PostsList input={input} />;
};

PostsHome.displayName = 'PostsHome';

registerComponent({ name: 'PostsHome', component: PostsHome });
