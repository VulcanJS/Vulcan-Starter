import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import get from 'lodash/get';

const UsersEdit = ({ match }) => {
  const slug = get(match, 'params.slug');
  return <Components.UsersEditForm input={{ filter: { slug: { _eq: slug } } }} />;
};

registerComponent({ name: 'UsersEdit', component: UsersEdit });
