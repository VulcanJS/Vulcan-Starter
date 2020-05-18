import addressSchema from './address_schema.js';

const addressGroup = {
  name: 'addresses',
  label: 'Addresses',
  order: 10
}


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
      query ProductsQuery {
        products{
          results{
            _id
            name
          }
        }
      }
    `,
    options: props =>
      props.data &&
      props.data.products &&
      props.data.products.results.map(product => ({
        value: product._id,
        label: product.name,
      })),
    resolveAs: {
      fieldName: 'product',
      type: 'Product',
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
    optional: true,
    arrayItem: {
      type: addressSchema,
      optional: true,
    },
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
    group: addressGroup,
  },

  // demo of a blackbox array: will generate a form, but no GraphQL type
  // blackboxNestedArray: {
  //   type: Array,
  //   canRead: ['guests'],
  //   canUpdate: ['members'],
  //   canCreate: ['members'],
  //   blackbox: true
  // },
  // 'blackboxNestedArray.$': {
  //   type: addressSchema,
  //   canRead: ['guests'],
  //   canUpdate: ['members'],
  //   canCreate: ['members'],
  //   onCreate: () => { return { hello: 'world' } }
  // },

};

export default schema;
