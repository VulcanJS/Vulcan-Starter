/*

A SimpleSchema-compatible JSON schema

*/

import FormsUpload from 'meteor/vulcan:forms-upload';

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
      resolver(pic, args, context) {
        return context.Users.findOne({ _id: pic.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },
  
  // custom properties

  imageUrl: {
    label: 'Image URL',
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: FormsUpload, // use the FormsUpload form component
    options: {
      preset: 'vulcanstagram'
    },
  },
  body: {
    label: 'Body',
    type: String,
    optional: true,
    input: 'textarea', // use a textarea form component
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members']
  },

  // GraphQL-only field

  commentsCount: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    hidden: true,
    resolveAs: {
      fieldName: 'commentsCount',
      type: 'Float',
      resolver(pic, args, context) {
        return context.Comments.find({picId: pic._id, isDeleted: {$ne: true}}).count();
      }
    }
  },

  managerId: {
    type: String,
    optional: true,
    canRead: ['members'],
    canUpdate: ['admins'],
    canCreate: ['admins'],
    resolveAs: {
      fieldName: 'manager',
      type: 'User',
      resolver(pic, args, context) {
        return context.Users.findOne({ _id: pic.managerId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },
};

export default schema;
