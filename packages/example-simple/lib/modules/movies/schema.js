/*

modules/movies/schema.js - #tutorial-step-10 -
This is a JS object that defines every property of a collection document...

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
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
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
  year: {
    label: 'Year',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  review: {
    label: 'Review',
    type: String,
    optional: true,
    input: 'textarea',
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
};

export default schema;
