import { GraphQLSchema, addGraphQLResolvers, addGraphQLQuery } from 'meteor/vulcan:core';

/*

SchemaContents resolver

Used to output the GraphQL schema as a string

*/
const schemaResolvers = {
  Query: {
    schemaContents(root, args, context) {
      return GraphQLSchema.finalSchema[0];
    },
  },
};
addGraphQLResolvers(schemaResolvers);

addGraphQLQuery(`schemaContents: String`);

/*

MoviesCount resolver

Used to display the total number of documents in the Movies collection

*/
import Movies from '../modules/collection.js';

const moviesCountResolvers = {
  Query: {
    moviesCount(root, args, context) {
      return Movies && Movies.find().count();
    },
  },
};
addGraphQLResolvers(moviesCountResolvers);

addGraphQLQuery(`moviesCount: Int`);
