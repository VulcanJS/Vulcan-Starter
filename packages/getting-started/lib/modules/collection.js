/*

The main Movies collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';

let Movies;

/*

Movies collection definition

Uncomment on #Step6:

*/

Movies = createCollection({

  collectionName: 'Movies',

  typeName: 'Movie',

  schema,
  
  resolvers: getDefaultResolvers('Movies'), // Uncomment on #Step9

  mutations: getDefaultMutations('Movies'), // Uncomment on #Step14

});

export default Movies;