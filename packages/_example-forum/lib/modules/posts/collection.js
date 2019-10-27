/*

Posts collection

*/

import schema from './schema.js';
import { createCollection } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { statuses } from '../data.js';

/**
 * @summary The global namespace for Posts.
 * @namespace Posts
 */
export const Posts = createCollection({
  collectionName: 'Posts',

  typeName: 'Post',

  schema,

  permissions: {
    canRead,
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
});

// user can view post if it's approved, or they are its owner; or they are admin
const canRead = ({ document: post, currentUser }) => {
  return (
    post.status === statuses.approved ||
    Users.owns(currentUser, post) ||
    Users.isAdmin(currentUser)
  );
};