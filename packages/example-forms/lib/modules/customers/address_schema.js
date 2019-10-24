import SimpleSchema from 'simpl-schema';

/*

Define a sub-schema for addresses

*/
const addressSchema = new SimpleSchema({
  street: {
    type: String,
    optional: false,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    max: 100, // limit street address to 100 characters
  },
  country: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
  },
  zipCode: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    input: 'number',
  },
});

export default addressSchema;