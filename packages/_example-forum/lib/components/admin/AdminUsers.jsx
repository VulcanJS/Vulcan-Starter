/*

Show a list of all bookings

http://docs.vulcanjs.org/core-components.html#Datatable

*/

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
  redirect: '/log-in',
};

registerComponent('AdminUsers', AdminUsers);

export default AdminUsers;
