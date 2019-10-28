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
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminUsers', AdminUsers);

export default AdminUsers;
