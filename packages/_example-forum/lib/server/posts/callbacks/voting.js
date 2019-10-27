/*

Voting callbacks

*/

import { Posts } from '../../../modules/posts/index.js';
import { performVoteServer } from 'meteor/vulcan:voting';

/**
 * @summary Make users upvote their own new posts
 */
export function upvoteOwnPost(document, { currentUser }) {
  return performVoteServer({
    document,
    voteType: 'upvote',
    collection: Posts,
    user: currentUser,
    updateDocument: false,
  });
}
