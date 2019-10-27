/*

Comments collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

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


// user can view comment if it's not deleted, or they are its owner; or they are admin
const canRead = ({ document: comment, currentUser}) => {
  return !comment.isDeleted || Users.owns(currentUser, comment) || Users.isAdmin(currentUser);
}