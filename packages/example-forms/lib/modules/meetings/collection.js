/*
Customers
*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core'
import schema from './schema.js'
import './fragments'
import './permissions'

const Meetings = createCollection({

  collectionName: 'Meetings',

  typeName: 'Meeting',

  schema,
  
  resolvers: getDefaultResolvers('Meetings'),

  mutations: getDefaultMutations('Meetings'),

});

Meetings.addDefaultView(terms => {
  return {
    options: {sort: {createdAt: -1}}
  };
});

export default Meetings;
