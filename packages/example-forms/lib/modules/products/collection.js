/*

Products

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core'
import schema from './schema.js'

const Products = createCollection({

  collectionName: 'Products',

  typeName: 'Product',

  schema,
  
  resolvers: getDefaultResolvers('Products'),

  mutations: getDefaultMutations('Products'),

});

export default Products;
