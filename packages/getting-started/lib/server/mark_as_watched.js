import { addGraphQLResolvers, addGraphQLMutation, updateMutator } from "meteor/vulcan:core";
import Movies from '../modules/collection.js';

// wait for x ms before moving on
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const markAsWatched = {
  Mutation: {
    async markAsWatched(root, { movieId }, context) {

      // add a 2s delay to simulate a slower operation
      await sleep(2000);

      const result = await updateMutator({
        collection: Movies,
        documentId: movieId,
        data: { isWatched: true },
        context,
      });
      return result.data;
    },
  },
};

// uncomment on #Step18
// addGraphQLResolvers(markAsWatched);
// addGraphQLMutation(`markAsWatched(movieId: String): Movie`);
