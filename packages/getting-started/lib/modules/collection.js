/*

The main Movies collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';

let Movies;

/*

Movies collection definition

Uncomment during Step 6

*/

// Movies = createCollection({

//   collectionName: 'Movies',

//   typeName: 'Movie',

//   schema,
  
//   // resolvers: getDefaultResolvers('Movies'), // Uncomment during Step 9

//   // mutations: getDefaultMutations('Movies'), // Uncomment during Step 14

// });


/*

Permissions for members (regular users)

*/
// const membersActions = [
//   'movies.new',
//   'movies.edit.own',
//   'movies.remove.own',
// ];
// Users.groups.members.can(membersActions);

export default Movies;