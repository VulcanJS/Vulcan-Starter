import Users from 'meteor/vulcan:users';

const membersActions = [
  'movies.new',
  'movies.update.own',
  'movies.delete.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'movies.update.all',
  'movies.delete.all'
];
Users.groups.admins.can(adminActions);
