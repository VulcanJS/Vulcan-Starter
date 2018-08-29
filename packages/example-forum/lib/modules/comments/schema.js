/*

Comments schema

*/

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Comments schema
 * @type {Object}
 */
const schema = {
  /**
    ID
  */
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  /**
    The `_id` of the parent comment, if there is one
  */
  parentCommentId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'parentComment',
      type: 'Comment',
      resolver: async (comment, args, {currentUser, Users, Comments}) => {
        if (!comment.parentCommentId) return null;
        const parentComment = await Comments.loader.load(comment.parentCommentId);
        return Users.restrictViewableFields(currentUser, Comments, parentComment);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The `_id` of the top-level parent comment, if there is one
  */
  topLevelCommentId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'topLevelComment',
      type: 'Comment',
      resolver: async (comment, args, {currentUser, Users, Comments}) => {
        if (!comment.topLevelCommentId) return null;
        const topLevelComment = await Comments.loader.load(comment.topLevelCommentId);
        return Users.restrictViewableFields(currentUser, Comments, topLevelComment);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The timestamp of comment creation
  */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    }
  },
  /**
    The timestamp of the comment being posted. For now, comments are always created and posted at the same time
  */
  postedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date();
    }
  },
  /**
    The comment body (Markdown)
  */
  body: {
    type: String,
    max: 3000,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: "textarea"
  },
  /**
    The HTML version of the comment body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({newDocument: comment}) => {
      if (comment.body) {
        return Utils.sanitize(marked(comment.body));
      }
    },
    onUpdate: ({data}) => {
      if (data.body) {
        return Utils.sanitize(marked(data.body));
      }
    }
  },
  /**
    The comment author's name
  */
  author: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onUpdate: ({data}) => {
      // if userId is changing, change the author name too
      if (data.userId) {
        return Users.getDisplayNameById(data.userId)
      }
    }
  },
  /**
    The post's `_id`
  */
  postId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    resolveAs: {
      fieldName: 'post',
      type: 'Post',
      resolver: async (comment, args, {currentUser, Users, Posts}) => {
        if (!comment.postId) return null;
        const post = await Posts.loader.load(comment.postId);
        return Users.restrictViewableFields(currentUser, Posts, post);
      },
      addOriginalField: true
    },
    hidden: true // never show this
  },
  /**
    The comment author's `_id`
  */
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: async (comment, args, {currentUser, Users}) => {
        if (!comment.userId) return null;
        const user = await Users.loader.load(comment.userId);
        return Users.restrictViewableFields(currentUser, Users, user);
      },
      addOriginalField: true
    },
  },
  /**
    Whether the comment is deleted. Delete comments' content doesn't appear on the site.
  */
  isDeleted: {
    type: Boolean,
    optional: true,
    canRead: ['guests'],
  },
  userIP: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },
  userAgent: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },
  referrer: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },

  // GraphQL only fields

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      fieldName: 'pageUrl',
      type: 'String',
      resolver: (comment, args, context) => {
        return context.Comments.getPageUrl(comment, true);
      },
    }
  },
};

export default schema;
