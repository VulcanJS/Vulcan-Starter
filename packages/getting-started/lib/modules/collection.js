/*

The main Movies collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';

/*

Movies collection definition

*/



const Movies = createCollection({

  collectionName: 'Movies',

  typeName: 'Movie',

  schema,
  
  resolvers: getDefaultResolvers('Movies'), // uncomment during Step 9

  mutations: getDefaultMutations('Movies'), // uncomment during Step 14

});

export default Movies;



/*

Permissions for members (regular users)

*/
// const membersActions = [
//   'movies.new',
//   'movies.edit.own',
//   'movies.remove.own',
// ];
// Users.groups.members.can(membersActions);

