import { createMutator, updateMutator, deleteMutator, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'departmentsCreate',

    check(user) {
      if (!user) return false;
      console.log('*****DEPARTMENT mutions create check****')
      console.log( Users.canDo(user, 'department.create'))
      return Users.canDo(user, 'department.create');
    },

    mutation(root, args, context) {
      const { data: document } = args;
      
      Utils.performCheck(this.check, context.currentUser, document);

      return createMutator({
        collection: context.Departments,
        document: document,
        currentUser: context.currentUser,
        validate: true, 
        context,
      });
    },
  },

  update: {
    name: 'departmentsUpdate',

    check(user) {
        if (!user) return false;
        return Users.canDo(user, 'department.update');
      },
      mutation(root, {selector, data}, context) {
        const document = context.Departments.findOne( {_id: selector.documentId || selector._id});
        Utils.performCheck(this.check, context.currentUser, document);
  
        return updateMutator({
          collection: context.Departments,
          selector: selector,
          data: data,
          currentUser: context.currentUser,
          validate: true,
          context,
        });
      },
  },

  delete: {
    name: 'departmentsDelete',

    check(user) {
        if (!user) return false;
        return Users.canDo(user, 'department.delete');
      },

      mutation(root, { selector }, context) {
        const document = context.Departments.findOne({ _id: selector.documentId || selector._id });
        Utils.performCheck(this.check, context.currentUser, document);
  
        return deleteMutator({
          collection: context.Departments,
          selector: selector,
          currentUser: context.currentUser,
          validate: true,
          context,
        });
      },
  },
};

export default mutations;