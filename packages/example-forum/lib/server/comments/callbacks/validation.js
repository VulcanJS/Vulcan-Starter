import Users from 'meteor/vulcan:users';
import { getSetting } from 'meteor/vulcan:core';
import { Comments } from '../../../modules/comments/index.js';
import { timeSinceLast } from '../../helpers.js';

export function rateLimit(validationErrors, { currentUser }) {
  if (!Users.isAdmin(currentUser)) {
    const timeSinceLastComment = timeSinceLast(currentUser, Comments);
    const commentInterval = Math.abs(
      parseInt(getSetting('forum.commentInterval', 15))
    );
    if (timeSinceLastComment < commentInterval) {
      validationErrors.push({
        id: 'comments.rate_limit_error',
        properties: { value: commentInterval - timeSinceLastComment },
      });
    }
  }
  return validationErrors;
}
