import SimpleSchema from 'simpl-schema';

const addressGroup = {
  name: 'addresses',
  label: 'Addresses',
  order: 10
}

/*

Define a sub-schema for addresses

*/
export const addressSchema = new SimpleSchema({
  street: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
    max: 100, // limit street address to 100 characters
  },
  country: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },
  zipCode: {
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
    control: 'number',
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
    searchable: true, // make field searchable
  },

  stage: {
    type: String,
    optional: false,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
    searchable: true,
    control: 'FormFunnel', // use a custom `FormFunnel` form input component
  },

  meetingDate: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },

  productId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
    query: `
      ProductsList{
        _id
        name
      }
    `,
    options: props =>
      props.data.ProductsList &&
      props.data.ProductsList.map(product => ({
        value: product._id,
        label: product.name,
      })),
    resolveAs: {
      fieldName: 'product',
      type: 'Product',
      resolver: (customer, args, { Products }) =>
        customer.productId && Products.loader.load(customer.productId),
      addOriginalField: true,
    },
    control: 'select',
  },

  /*

  The `address` field specifies that addresses should be store as an array, while
  `addresses.$` indicates the type of the array items (in this case, `addressSchema`)

  */
  addresses: {
    type: Array,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
    group: addressGroup,
  },

  'addresses.$': {
    type: addressSchema,
  },
};

export default schema;
