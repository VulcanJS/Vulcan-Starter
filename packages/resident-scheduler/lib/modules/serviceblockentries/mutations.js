import { createMutator, updateMutator, deleteMutator, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'serviceblocksCreate',

    check(user) {
      if (!user) return false;
      return Users.canDo(user, 'serviceblock.create');
    },

    mutation(root, args, context) {
      const { data: document } = args;
      
      Utils.performCheck(this.check, context.currentUser, document);

      return createMutator({
        collection: context.Serviceblocks,
        document: document,
        currentUser: context.currentUser,
        validate: true, 
        context,
      });
    },
  },

  update: {
    name: 'serviceblocksUpdate',

    check(user) {
        if (!user) return false;
        return Users.canDo(user, 'serviceblock.update');
      },
      mutation(root, {selector, data}, context) {
        const document = context.Serviceblocks.findOne( {_id: selector.documentId || selector._id});
        Utils.performCheck(this.check, context.currentUser, document);
  
        return updateMutator({
          collection: context.Serviceblocks,
          selector: selector,
          data: data,
          currentUser: context.currentUser,
          validate: true,
          context,
        });
      },
  },

  delete: {
    name: 'serviceblocksDelete',

    check(user) {
        if (!user) return false;
        return Users.canDo(user, 'serviceblock.delete');
      },

      mutation(root, { selector }, context) {
        const document = context.Serviceblocks.findOne({ _id: selector.documentId || selector._id });
        Utils.performCheck(this.check, context.currentUser, document);
  
        return deleteMutator({
          collection: context.Serviceblocks,
          selector: selector,
          currentUser: context.currentUser,
          validate: true,
          context,
        });
      },
  },
};

export default mutations;