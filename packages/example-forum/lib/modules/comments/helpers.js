import { getPageUrl as getPostPageUrl } from '../posts/helpers.js';

/**
 * @summary Get URL of a comment page.
 * @param {Object} comment
 */
export const getPageUrl = function(comment, isAbsolute = false){
  return `${getPostPageUrl({ _id: comment.postId, slug: '_'}, isAbsolute)}/#${comment._id}`;
};