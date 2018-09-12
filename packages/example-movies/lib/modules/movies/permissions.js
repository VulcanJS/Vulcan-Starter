import Users from 'meteor/vulcan:users';

const membersActions = [
  'movie.create',
  'movie.update.own',
  'movie.delete.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'movie.update.all',
  'movie.delete.all'
];
Users.groups.admins.can(adminActions);
