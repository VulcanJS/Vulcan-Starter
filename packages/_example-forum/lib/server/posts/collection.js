import { Connectors, extendCollection } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection.js';
import Categories from '../../modules/categories/collection.js';
import {
  rateLimit,
  duplicateLinksCheck,
  upvoteOwnPost,
  createNotifications,
  incrementUserPostCount,
} from './callbacks/index.js';

extendCollection(Posts, {
  callbacks: {
    create: {
      validate: [rateLimit, duplicateLinksCheck],
      after: [upvoteOwnPost],
      async: [createNotifications, incrementUserPostCount],
    },
    update: {
      validate: [duplicateLinksCheck],
    },
  },
  customFilters: [
    {
      name: '_byCategory',
      arguments: 'slug: String',
      filter: async ({ filterArguments }) => {
        const { slug } = filterArguments;
        const category = await Connectors.get(Categories, { slug });
        return {
          selector: { categoriesIds: category._id },
        };
      },
    },
  ],
});
