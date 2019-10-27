/*

Voting callbacks

*/

import { Posts } from '../../../modules/posts/index.js';
import Users from 'meteor/vulcan:users';
import { performVoteServer } from 'meteor/vulcan:voting';

/**
 * @summary Make users upvote their own new posts
 */
export function upvoteOwnPost({ document: post }) {
  var postAuthor = Users.findOne(post.userId);
  return {
    ...post,
    ...performVoteServer({
      document: post,
      voteType: 'upvote',
      collection: Posts,
      user: postAuthor,
      updateDocument: true,
    }),
  };
}
