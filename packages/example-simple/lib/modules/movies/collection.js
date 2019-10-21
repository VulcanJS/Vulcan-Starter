/*

modules/movies/collection.js - #tutorial-step-9 -
This is the main Movies collection definition file.

A collection in VulcanJS is basically is a model, a type of data, like posts, comments, or users.  

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/*

Movies collection definition

We create a new collection with the createModel function

*/
const Movies = createCollection({
  // We also pick a name for the collection
  collectionName: 'Movies',

  // We also pick a name for the model's GraphQL type,
  // typically the same word but singular instead of plural
  typeName: 'Movie',

  // This is the JavaScript schema that will be used to generate the GraphQL schema,
  // among other things
  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['owners', 'admins'],
    canDelete: ['owners', 'admins'],
  },

  defaultInput: {
    orderBy: {
      createdAt: 'desc',
    },
  },
});

export default Movies;
