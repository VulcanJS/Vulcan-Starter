/*

Products

*/

import { createCollection } from 'meteor/vulcan:core'
import schema from './schema.js'

const Products = createCollection({

  collectionName: 'Products',

  typeName: 'Product',

  schema,
  
  permissions: {
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners']
  },

});

export default Products;
