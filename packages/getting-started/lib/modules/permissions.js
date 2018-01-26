import Users from 'meteor/vulcan:users';

/*

Permissions for members (regular users)

Uncomment on #Step17

*/

const membersActions = [
  'movies.new',
  'movies.edit.own',
  'movies.remove.own',
];
Users.groups.members.can(membersActions);
