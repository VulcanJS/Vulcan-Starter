import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { Comments } from '../../modules/comments/collection.js';

const AdminComments = () => (
  <div className="admin-comments">
    <Components.Datatable collection={Comments} />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminComments', AdminComments);

export default AdminComments;
