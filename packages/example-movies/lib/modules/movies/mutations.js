/*

Define the three default mutations:

- create (e.g.: createMovie(data: {document: CreateMovieDataInput!}) : MovieOutput )
- update (e.g.: updateMovie(selector: MovieSelectorUniqueInput!, data: UpdateMovieDataInput!) : MovieOutput )
- delete (e.g.: deleteMovie(selector: MovieSelectorUniqueInput!) : MovieOutput )

Each mutation has:

- A name
- A check function that takes the current user and (optionally) the document affected
- The actual mutation

*/

import {
  createMutator,
  updateMutator,
  deleteMutator,
  Utils,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'moviesCreate',

    check(user) {
      if (!user) return false; //the user must be logged in
      return Users.canDo(user, 'movie.create'); // the user must have the permission to do the mutation. For this, see permissions.js
    },

    mutation(root, args, context) {
      const { data: document } = args;
      
      //run the check function defined above
      Utils.performCheck(this.check, context.currentUser, document);

      return createMutator({
        collection: context.Movies, // the collection we are creating a document in
        document: document, // the document inserted in the mutation input
        currentUser: context.currentUser, // the user doing the mutation
        validate: true, 
        context,
      });
    },
  },

  update: {
    name: 'moviesUpdate',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'movie.update.own')
        : Users.canDo(user, `movie.update.all`);
    },

    mutation(root, {selector, data}, context) {
      const document = context.Movies.findOne( {_id: selector.documentId || selector._id});
      // Utils.performCheck is applying this.check(context.currentUser, document); and returns an error if the result is false or if there is no user or document, ending the mutation before updating the db
      Utils.performCheck(this.check, context.currentUser, document);

      return updateMutator({
        collection: context.Movies, // the collection we are updating
        selector: selector, //the way to select the document to update
        data: data, // the new value of the document
        currentUser: context.currentUser, // the user performing the update
        validate: true, //if we should validate or not
        context,
      });
    },
  },

  delete: {
    name: 'moviesDelete',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'movie.delete.own')
        : Users.canDo(user, `movie.delete.all`);
    },

    mutation(root, { selector }, context) {
      const document = context.Movies.findOne({ _id: selector.documentId || selector._id });
      Utils.performCheck(this.check, context.currentUser, document);

      return deleteMutator({
        collection: context.Movies,
        selector: selector,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },
};

export default mutations;
