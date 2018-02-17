/*

Declare permissions for the customers collection.

*/

import Users from 'meteor/vulcan:users';

Users.groups.guests.can([
  'customers.new',
  'customers.edit.own',
  'customers.remove.own',
])