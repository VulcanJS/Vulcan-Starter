/*

Categories schema

*/

import { Utils } from 'meteor/vulcan:core';
import { getPageUrl } from './helpers.js';

// category schema
const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    onCreate: ({ document: category }) => {
      // if no slug has been provided, generate one
      const slug = category.slug || Utils.slugify(category.name);
      return Utils.getUnusedSlugByCollectionName('Categories', slug);
    },
    onUpdate: ({ data, document: category }) => {
      // if slug is changing
      if (data.slug && data.slug !== category.slug) {
        const slug = data.slug;
        return Utils.getUnusedSlugByCollectionName('Categories', slug);
      }
    },
  },

  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: category => getPageUrl(category, false),
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: category => getPageUrl(category, false),
    },
  },
};

export default schema;
