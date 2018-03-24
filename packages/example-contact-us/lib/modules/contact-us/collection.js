import {
  createCollection,
  getDefaultResolvers,
  getDefaultMutations,
} from 'meteor/vulcan:core';

import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const ContactUsForm = createCollection({
  schema,
  collectionName: 'ContactUsForm',
  typeName: 'ContactUsForm',
  resolvers: getDefaultResolvers('ContactUsForm'),
  mutations: getDefaultMutations('ContactUsForm', {
    newCheck: (user, document) => {
      return document;
    },
  }),
});

export default ContactUsForm;
