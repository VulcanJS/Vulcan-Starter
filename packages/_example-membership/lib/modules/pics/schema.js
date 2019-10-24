/*

A SimpleSchema-compatible JSON schema

*/

import FormsUpload from 'meteor/vulcan:forms-upload';
import { getSetting } from 'meteor/vulcan:core';

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
    canRead: ['customers', 'admins'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: FormsUpload, // use the FormsUpload form component
    options: {
      preset: getSetting('cloudinaryPresets').vulcanstagram
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

};

export default schema;
