/*
Customers
*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core'
import schema from './schema.js'

const Customers = createCollection({

  collectionName: 'Customers',

  typeName: 'Customer',

  schema,
  
  resolvers: getDefaultResolvers('Customers'),

  mutations: getDefaultMutations('Customers'),

});

Customers.addDefaultView(terms => {
  return {
    options: {sort: {createdAt: -1}}
  };
});

export default Customers;
