/*

Comments collection

*/

import schema from './schema.js';
import { createCollection } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { statuses } from '../data.js';

/**
 * @summary The global namespace for Comments.
 * @namespace Comments
 */
export const Comments = createCollection({
  collectionName: 'Comments',

  typeName: 'Comment',

  schema,

  permissions: {
    canRead,
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
});

// user can view comment if it's approved, or they are its owner; or they are admin
const canRead = ({ document: comment, currentUser }) => {
  return (
    comment.status === statuses.approved ||
    Users.owns(currentUser, comment) ||
    Users.isAdmin(currentUser)
  );
};
