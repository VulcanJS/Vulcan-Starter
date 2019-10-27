import { extendCollection } from 'meteor/vulcan:core';
import Comments from '../../../modules/comments/collection.js';
import { upvoteOwnComment } from './voting.js';
import { notifications } from './/notifications.js';
import { updateUserPost } from './other.js';

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
