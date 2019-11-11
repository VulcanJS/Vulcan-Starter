/*

Posts helpers

*/

import moment from 'moment';
import { Posts } from './collection.js';
import { Utils, getSetting } from 'meteor/vulcan:core';
import marked from 'marked';

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Return a post's link if it has one, else return its post page URL
 * @param {Object} post
 */
export const getLink = function(post, isAbsolute = false, isRedirected = false) {
  const url = isRedirected ? Utils.getOutgoingUrl(post.url) : post.url;
  return !!post.url ? url : getPageUrl(post, isAbsolute);
};

/**
 * @summary Whether a post's link should open in a new tab or not
 * @param {Object} post
 */
export const getLinkTarget = function(post) {
  return !!post.url ? '_blank' : '';
};

/**
 * @summary Get URL of a post page.
 * @param {Object} post
 */
export const getPageUrl = function(post, isAbsolute = false) {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/posts/${post._id}/${post.slug}`;
};

/**
 * @summary Get URL for sharing on Twitter.
 * @param {Object} post
 */
export const getTwitterShareUrl = post => {
  const via = getSetting('twitterAccount', null)
    ? `&via=${getSetting('twitterAccount')}`
    : '';
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title
  )}%20${encodeURIComponent(getLink(post, true))}${via}`;
};

/**
 * @summary Get URL for sharing on Facebook.
 * @param {Object} post
 */
export const getFacebookShareUrl = post => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    getLink(post, true)
  )}`;
};

/**
 * @summary Get URL for sharing by Email.
 * @param {Object} post
 */
export const getEmailShareUrl = post => {
  const subject = `Interesting link: ${post.title}`;
  const body = `I thought you might find this interesting:

${post.title}
${getLink(post, true, false)}

(found via ${getSetting('siteUrl')})
  `;
  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

///////////////////
// Other Helpers //
///////////////////

/**
 * @summary Check to see if post URL is unique.
 * We need the current user so we know who to upvote the existing post as.
 * @param {String} url
 */
export const checkForSameUrl = function(url) {
  // check that there are no previous posts with the same link in the past 6 months
  var sixMonthsAgo = moment()
    .subtract(6, 'months')
    .toDate();
  var postWithSameLink = Posts.findOne({
    url: url,
    postedAt: { $gte: sixMonthsAgo },
  });

  return !!postWithSameLink;
};

export const isFuture = post => {
  if (!post.postedAt) {
    return false;
  }
  const postTime = new Date(post.postedAt).getTime();
  const currentTime = new Date().getTime() + 1000;
  return postTime > currentTime; // round up to the second
};

export const getHTML = (contents, trim) => {
  if (contents) {
    const html = Utils.sanitize(marked(contents));
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    return trim
      ? Utils.trimHTML(html, getSetting('forum.postExcerptLength', 30))
      : html;
  }
};
