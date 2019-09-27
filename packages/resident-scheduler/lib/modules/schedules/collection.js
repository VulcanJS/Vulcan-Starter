/*

modules/movies/collection.js - #tutorial-step-9 -
This is the main Movies collection definition file.

A collection in VulcanJS is basically is a model, a type of data, like posts, comments, or users.  

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';
import resolvers from './resolver.js'
import mutations from './mutations.js'

/*

Schedules collection definition

We create a new collection with the createCollection function
*/
const Schedules = createCollection({

  // It takes the collection name...
  collectionName: 'Schedules',

  // ...the type name, which is it's name of that type's singular instance
  // usually it is the same as the collection name but singular.
  // It comes in useful when it is time to build our GraphQL schema...
  typeName: 'Schedule',

  // ...this is a JS schema, not GraphQL...
  schema,
  
  // ...then our default resolvers and default mutations...

  // A resolver is the thing that gives you data, that fetches it in the database and sends it to the client.
  // There are two default resolvers: multi - for a list of documents, and single - for a single document.
  // You can code your own too. Check out the next example, the movies example to do so...
  // resolvers: getDefaultResolvers('Schedules'),
  resolvers: resolvers,

  // A mutation is the act of changing data on the server.
  // There are three default mutaitons: creating a new document, updating an existing document, and deleting a document. You can only do this if you own it.
  // mutations: getDefaultMutations('Schedules'),
  mutations: mutations,

});

/*

Permissions for members (regular users)

...members are default users in Vulcan...

*/
const membersActions = [
  // ...these are the actions that members can do...
  'schedules.create',
  'schedules.edit.own',
  'schedules.remove.own',
];
Users.groups.members.can(membersActions);

/*

Default sort

This is the default sort view for this data type...

*/
Schedules.addDefaultView(terms => ({
  options: {
    sort: {
      // ...We want to order by when it was created.
      // This gets passed to MongoDB.
      // This will insert in the same order on the server and the client,
      // which is how the app knew where to put our new Jaws 14 entry in the page.
      createdAt: -1
    }
  }
}));

export default Schedules;

// There were three things I mentioned that you might not have heard of:
// schema, resolvers, and mutations. I will talk about them in the next steps.
