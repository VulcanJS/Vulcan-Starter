import Users from 'meteor/vulcan:users';
import { Connectors } from 'meteor/vulcan:core';

const notificationsGroup = {
  name: 'notifications',
  order: 2,
};

Users.addField([
  /**
    Count of the user's posts
  */
  {
    fieldName: 'postCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      canRead: ['guests'],
    },
  },
  /**
  The user's associated posts (GraphQL only)
*/
  {
    fieldName: 'posts',
    fieldSchema: {
      type: Object,
      optional: true,
      canRead: ['guests'],
      resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[Post]',
        resolver: async (user, { limit }, { currentUser, Users, Posts }) => {
          const posts = await Connectors.find(
            Posts,
            { userId: user._id },
            { limit }
          );
          return Users.restrictDocuments({
            user: currentUser,
            collection: Posts,
            documents: posts,
          });
        },
      },
    },
  },
  /**
  The user's associated comments (GraphQL only)
*/
  {
    fieldName: 'comments',
    fieldSchema: {
      type: Object,
      optional: true,
      canRead: ['guests'],
      resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[Comment]',
        resolver: async (user, { limit }, { currentUser, Users, Comments }) => {
          const comments = await Connectors.find(
            Comments,
            { userId: user._id },
            { limit }
          );
          return Users.restrictDocuments({
            user: currentUser,
            collection: Comments,
            documents: comments,
          });
        },
      },
    },
  },
  // count of the user's comments
  {
    fieldName: 'commentCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      canRead: ['guests'],
    },
  },
  // Add notifications options to user profile settings
  {
    fieldName: 'notifications_users',
    fieldSchema: {
      label: 'New users',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['admins'],
      canUpdate: ['admins'],
      group: notificationsGroup,
    },
  },
  {
    fieldName: 'notifications_posts',
    fieldSchema: {
      label: 'New posts',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    },
  },
  {
    fieldName: 'notifications_comments',
    fieldSchema: {
      label: 'Comments on my posts',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    },
  },
  {
    fieldName: 'notifications_replies',
    fieldSchema: {
      label: 'Replies to my comments',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    },
  },
]);
