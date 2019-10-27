import { extendCollection } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection.js';
import { upvoteOwnPost } from '../callbacks/voting.js';
import { rateLimit, duplicateLinksCheck } from '../callbacks/validation.js';
import { createNotifications } from '../callbacks/notifications.js';
// import { userUpvotedPosts } from './filters.js';

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
  // filters: {
  //   userUpvotedPosts,
  // }
});
