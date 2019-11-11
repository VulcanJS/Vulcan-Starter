import { Comments } from '../../../modules/comments/index.js';
import { performVoteServer } from 'meteor/vulcan:voting';

/**
 * @summary Make users upvote their own new comments
 */
export function upvoteOwnComment(document, { currentUser }) {
  return performVoteServer({
    document,
    voteType: 'upvote',
    collection: Comments,
    user: currentUser,
    updateDocument: false,
  });
}