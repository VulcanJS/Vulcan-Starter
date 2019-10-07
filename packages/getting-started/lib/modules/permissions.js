import Users from 'meteor/vulcan:users';

/*

Permissions for members (regular users)

Uncomment on #Step17

*/

const membersActions = [
  'movie.create',
  'movie.update.own',
  'movie.delete.own',
];
// Users.groups.members.can(membersActions);
