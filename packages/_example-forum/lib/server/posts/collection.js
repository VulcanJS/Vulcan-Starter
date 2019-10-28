import { extendCollection } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection.js';
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
});
