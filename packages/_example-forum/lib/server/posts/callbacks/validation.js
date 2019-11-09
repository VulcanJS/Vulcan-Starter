/*

Post validation and rate limiting callbacks

*/

import { Posts } from '../../../modules/posts/index.js';
import Users from 'meteor/vulcan:users';
import { getSetting } from 'meteor/vulcan:core';
import { timeSinceLast, numberOfItemsInPast24Hours } from '../../helpers.js';
import { Categories } from '../../../modules/categories/collection.js';

/**
 * @summary Rate limiting
 */
export function rateLimit(validationErrors, { currentUser }) {
  if (!Users.isAdmin(currentUser)) {
    const timeSinceLastPost = timeSinceLast(currentUser, Posts);
    const numberOfPostsInPast24Hours = numberOfItemsInPast24Hours(currentUser, Posts);
    const postInterval = parseInt(getSetting('forum.postInterval', 30));
    const maxPostsPer24Hours = parseInt(getSetting('forum.maxPostsPerDay', 5));

    // check that user waits more than X seconds between posts
    if (timeSinceLastPost < postInterval) {
      validationErrors.push({
        break: true,
        id: 'posts.rate_limit_error',
        properties: { value: postInterval - timeSinceLastPost },
      });
    }
    // check that the user doesn't post more than Y posts per day
    if (numberOfPostsInPast24Hours >= maxPostsPer24Hours) {
      validationErrors.push({
        break: true,
        id: 'posts.max_per_day',
        properties: { value: maxPostsPer24Hours },
      });
    }
  }
  return validationErrors;
}

/**
 * @summary Check for duplicate links
 */
export function duplicateLinksCheck(validationErrors, { document: post }) {
  if (!!post.url && Posts.checkForSameUrl(post.url)) {
    validationErrors.push({
      break: true,
      id: 'posts.link_already_posted',
      path: 'url',
      properties: { url: post.url },
    });
  }
  return validationErrors;
}

export function checkCategories ({ document }) {
  // if there are no categories, stop here
  if (!document.categories || document.categories.length === 0) {
    return;
  }
  // check how many of the categories given also exist in the db
  const categoryCount = Categories.find({_id: {$in: document.categories}}).count();
  if (document.categories.length !== categoryCount) {
    throw new Error({id: 'categories.invalid'});
  }
  return document;
}