/*

A SimpleSchema-compatible JSON schema

*/

const schema = {

  // HierarchicalInterface required properties

  parentId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'parent',
      type: 'HierarchicalInterface',
      resolver: (category, args, context) => {
        if (!category.parentId) return null;
        return context.Categories.findOne(
          { _id: category.parentId },
          { fields: context.Users.getViewableFields(context.currentUser, context.Categories) }
        );
      },
      addOriginalField: true,
    },
  },

  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date();
    }
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (category, args, context) => {
        return context.Users.findOne({ _id: category.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },
  
  // custom properties

  name: {
    label: 'Name',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },

};

export default schema;
