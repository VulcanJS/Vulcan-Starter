/*

Callbacks to:

- Increment a user's post count
- Run post approved callbacks
- Update a user's post count
- Remove a user's posts when it's deleted
- Track clicks

*/

import { Posts } from '../../../modules/posts/index.js'
import Users from 'meteor/vulcan:users';
import { Connectors, getSetting } from 'meteor/vulcan:core';
import Events from 'meteor/vulcan:events';

/**
 * @summary Increment the user's post count
 */
export function incrementUserPostCount(post) {
  var userId = post.userId;
  Users.update({ _id: userId }, { $inc: { 'postCount': 1 } });
}

//////////////////////////////////////////////////////
// posts.remove.sync                                //
//////////////////////////////////////////////////////

export function PostsRemoveOperations(post) {
  Users.update({ _id: post.userId }, { $inc: { 'postCount': -1 } });
  return post;
}
// addCallback('posts.remove.sync', PostsRemoveOperations);

//////////////////////////////////////////////////////
// users.remove.async                               //
//////////////////////////////////////////////////////

export function UsersRemoveDeletePosts(user, options) {
  if (options.deletePosts) {
    Posts.remove({ userId: user._id });
  } else {
    // not sure if anything should be done in that scenario yet
    // Posts.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
// addCallback('users.remove.async', UsersRemoveDeletePosts);

//////////////////////////////////////////////////////
// posts.click.async                                //
//////////////////////////////////////////////////////

// /**
//  * @summary Increase the number of clicks on a post
//  * @param {string} postId – the ID of the post being edited
//  * @param {string} ip – the IP of the current user
//  */

export function clickTracking(post, ip) {
  if (getSetting('forum.trackClickEvents', true)) {
    Events.track('post.click', { title: post.title, postId: post._id });
    Connectors.update(Posts, post._id, { $inc: { clickCount: 1 } });
  }
}

// track links clicked, locally in Events collection
// note: this event is not sent to segment cause we cannot access the current user 
// in our server-side route /out -> sending an event would create a new anonymous 
// user: the free limit of 1,000 unique users per month would be reached quickly
// addCallback('posts.click.async', PostsClickTracking);
