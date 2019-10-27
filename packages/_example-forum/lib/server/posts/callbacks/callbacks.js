import { extendCollection } from 'meteor/vulcan:core';
import Posts from '../../../modules/posts/collection.js';
import { upvoteOwnPost } from './voting.js';
import { rateLimit, duplicateLinksCheck } from './validation.js';
import { createNotifications } from './notifications.js';

extendCollection(Posts, {
  callbacks: {
    create: {
      validate: [rateLimit, duplicateLinksCheck],
      before: [],
      after: [upvoteOwnPost],
      async: [createNotifications],
    },
    update: {
      validate: [duplicateLinksCheck]
    }
  },
});
