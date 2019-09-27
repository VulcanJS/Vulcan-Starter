import { createMutator, updateMutator, deleteMutator, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'schedulesCreate',

    check(user) {
      if (!user) return false;
      return Users.canDo(user, 'schedule.create');
    },

    mutation(root, args, context) {
      const { data: document } = args;
      
      Utils.performCheck(this.check, context.currentUser, document);

      return createMutator({
        collection: context.Schedules,
        document: document,
        currentUser: context.currentUser,
        validate: true, 
        context,
      });
    },
  },

  update: {
    name: 'schedulesUpdate',

    check(user) {
        if (!user) return false;
        return Users.canDo(user, 'schedule.update');
      },
      mutation(root, {selector, data}, context) {
        const document = context.Schedules.findOne( {_id: selector.documentId || selector._id});
        Utils.performCheck(this.check, context.currentUser, document);
  
        return updateMutator({
          collection: context.Schedules,
          selector: selector,
          data: data,
          currentUser: context.currentUser,
          validate: true,
          context,
        });
      },
  },

  delete: {
    name: 'schedulesDelete',

    check(user) {
        if (!user) return false;
        return Users.canDo(user, 'schedule.delete');
      },

      mutation(root, { selector }, context) {
        const document = context.Schedules.findOne({ _id: selector.documentId || selector._id });
        Utils.performCheck(this.check, context.currentUser, document);
  
        return deleteMutator({
          collection: context.Schedules,
          selector: selector,
          currentUser: context.currentUser,
          validate: true,
          context,
        });
      },
  },
};

export default mutations;