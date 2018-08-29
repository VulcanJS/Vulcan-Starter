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

const schema = {
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    onCreate: () => {
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
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    searchable: true, // make field searchable
  },

  notes: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    input: 'textarea',
    searchable: true, // make field searchable
  },

  stage: {
    type: String,
    optional: false,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    searchable: true,
    input: 'FormFunnel', // use a custom `FormFunnel` form input component
  },

  meetingDate: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
  },

  productId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    query: `
      products{
        results{
          _id
          name
        }
      }
    `,
    options: props =>
      props.data.products &&
      props.data.products.results.map(product => ({
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
    input: 'select',
  },

  isVIP: {
    type: Boolean,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
  },

  categories: {
    type: Array,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    options: [{ label: 'Tech', value: 'tech' }, { label: 'Finance', value: 'finance' }, { label: 'Medical', value: 'medical' }],
    input: 'checkboxgroup',
  },

  'categories.$': {
    type: String,
    optional: true,
  },

  /*

  The `address` field specifies that addresses should be store as an array, while
  `addresses.$` indicates the type of the array items (in this case, `addressSchema`)

  */
  addresses: {
    type: Array,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    group: addressGroup,
  },

  'addresses.$': {
    type: addressSchema,
  },
};

export default schema;
