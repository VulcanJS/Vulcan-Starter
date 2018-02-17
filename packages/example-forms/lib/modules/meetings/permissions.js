/*

Declare permissions for the customers collection.

*/

import Users from 'meteor/vulcan:users';

Users.groups.guests.can([
  'meetings.new',
  'meetings.edit.own',
  'meetings.remove.own',
])