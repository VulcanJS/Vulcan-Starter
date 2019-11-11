import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { Categories } from '../../modules/categories/collection.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const AdminCategories = () => (
  <div className="admin-categories">
    <Components.Datatable
      collection={Categories}
      columns={['name', 'slug']}
      newFormProps={{ label: <FormattedMessage id="categories.new" /> }}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminCategories', AdminCategories, [withAccess, accessOptions]);

export default AdminCategories;
