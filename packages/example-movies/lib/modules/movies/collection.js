/*

The main Movies collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations, } from 'meteor/vulcan:core';
import schema from './schema.js';
import resolvers from './resolvers.js';
import './fragments.js';
import mutations from './mutations.js';
import './permissions.js';
import './parameters.js';

const Movies = createCollection({
  collectionName: 'Movies',

  typeName: 'Movie',

  schema: schema,

  resolvers: resolvers,
  // resolvers: getDefaultResolvers({typeName:'Movie'}),

  mutations: mutations,
  // mutations: getDefaultMutations({typeName: 'Movie'}),
});

export default Movies;
