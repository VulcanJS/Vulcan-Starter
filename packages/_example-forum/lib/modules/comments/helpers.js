/*

Comments helpers

*/

import { Posts } from '../posts/index.js';
import Users from 'meteor/vulcan:users';
import { getPageUrl as getPostPageUrl } from '../posts/helpers.js';

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a comment page.
 * @param {Object} comment
 */
export const getPageUrl = function(comment, isAbsolute = false){
  const post = Posts.findOne(comment.postId);
  return `${getPostPageUrl(post, isAbsolute)}/#${comment._id}`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Get a comment author's name
 * @param {Object} comment
 */
export const getAuthorName = function (comment) {
  var user = Users.findOne(comment.userId);
  return user ? Users.getDisplayName(user) : comment.author;
};
