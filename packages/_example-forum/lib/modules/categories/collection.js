/*

The Categories collection

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Categories.
 * @namespace Categories
 */
export const Categories = createCollection({
  collectionName: 'Categories',

  typeName: 'Category',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },

  defaultInput: {
    sort: {
      name: 'asc',
    },
  },
});

export default Categories;