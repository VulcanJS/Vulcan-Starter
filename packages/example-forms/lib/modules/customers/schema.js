import SimpleSchema from 'simpl-schema';

export const addressSchema = new SimpleSchema({
  street: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },
  country: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },
});

const schema = {
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    onInsert: (document, currentUser) => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
  },

  name: {
    type: String,
    optional: false,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },

  addresses: {
    type: Array,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },

  'addresses.$': {
    type: addressSchema,
  },
};

export default schema;
