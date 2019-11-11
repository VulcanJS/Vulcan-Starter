import { extendCollection } from 'meteor/vulcan:core';
import { Comments } from '../../modules/comments/collection.js';
import {
  rateLimit,
  upvoteOwnComment,
  notifications,
  updateUserPost,
} from './callbacks/index.js';

extendCollection(Comments, {
  callbacks: {
    create: {
      validate: [rateLimit],
      after: [upvoteOwnComment, updateUserPost],
      async: [notifications],
    },
  },
});