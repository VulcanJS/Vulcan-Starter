import { extendCollection } from 'meteor/vulcan:core';
import Categories from '../../modules/comments/categories.js';
import { checkCategories } from './callbacks.js';

extendCollection(Categories, {
  callbacks: {
    create: {
      validate: [checkCategories],
    },
    update: {
      validate: [checkCategories],
    },
  },
});
