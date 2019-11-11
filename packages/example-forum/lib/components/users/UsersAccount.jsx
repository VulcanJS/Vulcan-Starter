import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';

const UsersAccount = ({ currentUser }) => (
  <Components.UsersEditForm input={{ filter: { _id: { _eq: currentUser._id } } }} />
);

registerComponent({ name: 'UsersAccount', component: UsersAccount, hocs: [withCurrentUser] });
