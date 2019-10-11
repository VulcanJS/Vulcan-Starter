/*

modules/movies/collection.js - #tutorial-step-9 -
This is the main Movies collection definition file.

A collection in VulcanJS is basically is a model, a type of data, like posts, comments, or users.  

*/

import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
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

  // ...then our default resolvers and default mutations...

  // A resolver is the thing that gives you data, that fetches it in the database and sends it to the client.
  // There are two default resolvers: multi - for a list of documents, and single - for a single document.
  // You can code your own too.
  resolvers: getDefaultResolvers({ typeName: 'Movie' }),

  // A mutation is the act of changing data on the server.
  // There are three default mutaitons: creating a new document, updating an existing document, and deleting a document.
  mutations: getDefaultMutations({ typeName: 'Movie' }),

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners', 'admins'],
    canDelete: ['owners', 'admins'],
  },

  defaultInput: {
    orderBy: {
      createdAt: 'desc'
    },
  },

});

/*

Permissions for members (regular users)

...members are default users in Vulcan...

*/
const membersActions = [
  // ...these are the actions that members can do...
  'movie.create',
  'movie.update.own',
  'movie.delete.own',
];
Users.groups.members.can(membersActions);

/*

Default sort

This is the default sort view for this data type...

*/
Movies.addDefaultView(terms => ({
  options: {
    sort: {
      // ...We want to order by when it was created.
      // This gets passed to MongoDB.
      // This will insert in the same order on the server and the client,
      // which is how the app knew where to put our new Jaws 14 entry in the page.
      createdAt: -1,
    },
  },
}));

export default Movies;
