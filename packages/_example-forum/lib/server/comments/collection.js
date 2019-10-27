import { extendCollection } from 'meteor/vulcan:core';
import Comments from '../../modules/comments/collection.js';
import { upvoteOwnComment } from '../callbacks/voting.js';
import { notifications } from '../callbacks/notifications.js';
import { updateUserPost } from '../callbacks/other.js';

extendCollection(Comments, {
  callbacks: {
    create: {
      validate: [rateLimit],
      before: [],
      after: [upvoteOwnComment, updateUserPost],
      async: [notifications],
    },
  },
});
