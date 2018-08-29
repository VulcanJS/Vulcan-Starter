/*

A SimpleSchema-compatible JSON schema

*/

const schema = {

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
      resolver(comment, args, context) {
        return context.Users.findOne({ _id: comment.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },
  
  // custom properties

  body: {
    label: 'Body',
    placeholder: 'Add a comment…',
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members']
  },
  picId: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    hidden: true, // never show this in forms
  },
  
};

export default schema;
