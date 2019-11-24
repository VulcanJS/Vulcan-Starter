import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const AdminUsers = () => (
  <div className="admin-users">
    <Components.Datatable
      collection={Users}
      columns={[
        {
          name: 'createdAt',
          sortable: true,
        },
        {
          name: 'displayName',
          sortable: true,
        },
        {
          name: 'email',
          sortable: true,
        },
        {
          name: 'groups',
          filterable: true,
        },
      ]}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminUsers', AdminUsers, [withAccess, accessOptions]);

export default AdminUsers;
