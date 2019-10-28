import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { Categories } from '../../modules/categories/collection.js';

const AdminCategories = () => (
  <div className="admin-categories">
    <Components.Datatable collection={Categories} />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminCategories', AdminCategories);

export default AdminCategories;
