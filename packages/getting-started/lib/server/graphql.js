import { GraphQLSchema, addGraphQLResolvers, addGraphQLQuery, addGraphQLSchema } from 'meteor/vulcan:core';
import { getSteps } from './steps.js';

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

/*

StepCompletion resolver

Used to display step completion progress

*/
addGraphQLSchema(`
type Step {
  step: Int
  completed: Boolean
  progress: [Boolean]
  title: String
}`);

const steps = {
  Query: {
    async steps() {
      return await getSteps();
    },
  },
};
addGraphQLResolvers(steps);

addGraphQLQuery(`steps: [Step]`);