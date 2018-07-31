/*

Define the three default mutations:

- new (e.g.: moviesNew(document: moviesInput) : Movie )
- edit (e.g.: moviesEdit(documentId: String, set: moviesInput, unset: moviesUnset) : Movie )
- remove (e.g.: moviesRemove(documentId: String) : Movie )

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
      if (!user) return false;
      return Users.canDo(user, 'movies.new');
    },

    mutation(root, args, context) {
      const {
        input: { data: document },
      } = args;
      Utils.performCheck(this.check, context.currentUser, document);

      return {
        data: createMutator({
          collection: context.Movies,
          document: document,
          currentUser: context.currentUser,
          validate: true,
          context,
        }),
      };
    },
  },

  update: {
    name: 'moviesUpdate',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'movies.update.own')
        : Users.canDo(user, `movies.update.all`);
    },

    mutation(root, args, context) {
      console.log(args);
      const {
        input: {
          selector: { documentId: _id },
        },
      } = args;
      const document = context.Movies.findOne(_id);
      Utils.performCheck(this.check, context.currentUser, document);

      return {
        data: updateMutator({
          collection: context.Movies,
          selector: args.selector,
          data: args.data,
          currentUser: context.currentUser,
          validate: true,
          context,
        }),
      };
    },
  },

  delete: {
    name: 'moviesDelete',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'movies.delete.own')
        : Users.canDo(user, `movies.delete.all`);
    },

    mutation(root, args, context) {
      const {
        input: {
          selector: { documentId: _id },
        },
      } = args;
      const document = context.Movies.findOne({ _id: _id });
      Utils.performCheck(this.check, context.currentUser, document);

      return {
        data: deleteMutator({
          collection: context.Movies,
          documentId: _id,
          currentUser: context.currentUser,
          validate: true,
          context,
        }),
      };
    },
  },
};

export default mutations;
