/*

Posts schema

*/

import Users from 'meteor/vulcan:users';
import { Utils, getSetting } from 'meteor/vulcan:core';
import moment from 'moment';
import {
  isFuture,
  getHTML,
  getTwitterShareUrl,
  getEmailShareUrl,
  getFacebookShareUrl,
  getPageUrl,
} from './helpers.js';
import { statuses, statusesOptions } from '../data.js';

/**
 * @summary Posts config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2,
  },
};

/**
 * @summary Posts schema
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
    Timetstamp of post creation
  */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  /**
    URL
  */
  url: {
    type: String,
    optional: true,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'url',
    order: 10,
    searchable: true,
    query: `
      SiteData{
        logoUrl
        title
      }
    `,
  },
  /**
    Title
  */
  title: {
    type: String,
    optional: false,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'text',
    order: 20,
    searchable: true,
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document: post }) => {
      return Utils.slugify(post.title);
    },
    onUpdate: ({ data }) => {
      if (data.title) {
        return Utils.slugify(data.title);
      }
    },
  },
  /**
    Post body (markdown)
  */
  body: {
    type: String,
    optional: true,
    max: 3000,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
    order: 30,
  },
  /**
    HTML version of the post body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document }) => getHTML(document.body),
    onUpdate: ({ data }) => getHTML(data.body),
  },
  /**
   Post Excerpt
   */
  excerpt: {
    type: String,
    optional: true,
    canRead: ['guests'],
    searchable: true,
    onCreate: ({ document }) => getHTML(document.body, true),
    onUpdate: ({ data }) => getHTML(data.body, true),
  },
  /**
    Count of how many times the post's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true,
    canRead: ['admins'],
    defaultValue: 0,
  },
  /**
    Timestamp of the last comment
  */
  lastCommentedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
  },
  /**
    Count of how many times the post's link was clicked
  */
  clickCount: {
    type: Number,
    optional: true,
    canRead: ['admins'],
    defaultValue: 0,
  },
  /**
    The post's status. One of pending (`1`), approved (`2`), or deleted (`3`)
  */
  status: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'select',
    onCreate: ({ document, currentUser }) => {
      if (isFuture(document)) {
        return statuses.scheduled;
      } else if (Users.isAdmin(currentUser)) {
        return document.status || statuses.approved;
      } else {
        return getSetting('forum.requirePostsApproval', false)
          ? statuses.pending
          : statuses.approved;
      }
    },
    onUpdate: ({ data }) => {
      // if postedAt date is manually being changed, force status to scheduled or approved
      if (data.postedAt) {
        return isFuture(data) ? statuses.scheduled : statuses.approved;
      }
    },
    options: () => statusesOptions,
    group: formGroups.admin,
  },

  /**
    Timestamp of post first appearing on the site (i.e. being approved)
  */
  postedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'datetime',
    group: formGroups.admin,
    onCreate: ({ document: post }) => {
      if (post.status === statuses.approved) {
        return new Date();
      }
    },
    onUpdate: ({ data, document: post }) => {
      if (!post.postedAt && data.status === statuses.approved) {
        return new Date();
      }
    },
    resolveAs: {
      type: 'String',
      name: 'postedAtFormatted',
      resolver: post => {
        return moment(post.postedAt).format('dddd, MMMM Do YYYY');
      },
    },
  },
  /**
    Whether a post is scheduled in the future or not
  */
  // isFuture: {
  //   type: Boolean,
  //   optional: true,
  //   canRead: ['guests'],
  //   onCreate: ({ document: post }) => {
  //     // Set the post's isFuture to true if necessary
  //     if (post.postedAt) {
  //       const postTime = new Date(post.postedAt).getTime();
  //       const currentTime = new Date().getTime() + 1000;
  //       return postTime > currentTime; // round up to the second
  //     }
  //   },
  //   onUpdate: ({ data, document: post }) => {
  //     // Set the post's isFuture to true if necessary
  //     if (data.postedAt) {
  //       const postTime = new Date(data.postedAt).getTime();
  //       const currentTime = new Date().getTime() + 1000;
  //       if (postTime > currentTime) {
  //         // if a post's postedAt date is in the future, set isFuture to true
  //         return true;
  //       } else if (post.isFuture) {
  //         // else if a post has isFuture to true but its date is in the past, set isFuture to false
  //         return false;
  //       }
  //     }
  //   },
  // },
  /**
    Whether the post is sticky (pinned to the top of posts lists)
  */
  sticky: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'checkbox',
    group: formGroups.admin,
  },
  /**
    Save info for later spam checking on a post. We will use this for the akismet package
  */
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
  /**
    The post author's `_id`.
  */
  userId: {
    type: String,
    optional: true,
    input: 'select',
    canRead: ['guests'],
    canCreate: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
    },
  },
  categoriesIds: {
    type: Array,
    input: 'checkboxgroup',
    optional: true,
    canCreate: ['members'],
    canUpdate: ['members'],
    canRead: ['guests'],
    options: props => {
      return getCategoriesAsOptions(props.data.categories.results);
    },
    query: `
        categories{
          results{
            _id
            name
            slug
            order
          }
        }
      `,
    resolveAs: {
      fieldName: 'categories',
      type: '[Category]',
      // resolver: async (post, args, { currentUser, Users, Categories }) => {
      //   if (!post.categoriesIds) return [];
      //   const categories = _.compact(
      //     await Categories.loader.loadMany(post.categoriesIds)
      //   );
      //   return Users.restrictViewableFields(
      //     currentUser,
      //     Categories,
      //     categories
      //   );
      // },
      // addOriginalField: true,
    },
  },
  'categoriesIds.$': {
    type: String,
    optional: true,
  },

  /**
    Count of the post's comments
  */
  commentCount: {
    type: Number,
    optional: true,
    defaultValue: 0,
    canRead: ['guests'],
  },
  /**
  An array containing the `_id`s of commenters
  */
  commentersIds: {
    type: Array,
    optional: true,
    resolveAs: {
      fieldName: 'commenters',
      type: '[User]',
      // resolver: async (post, args, { currentUser, Users }) => {
      //   if (!post.commenters) return [];
      //   const commenters = await Users.loader.loadMany(post.commenters);
      //   return Users.restrictViewableFields(currentUser, Users, commenters);
      // },
    },
    canRead: ['guests'],
  },
  'commentersIds.$': {
    type: String,
    optional: true,
  },

  // GraphQL-only fields

  domain: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, context) => {
        return Utils.getDomain(post.url);
      },
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return getPageUrl(post, true);
      },
    },
  },

  linkUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return post.url
          ? Utils.getOutgoingUrl(post.url)
          : getPageUrl(post, true);
      },
    },
  },

  commentsCount: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'Int',
      resolver: (post, args, { Comments }) => {
        const commentsCount = Comments.find({ postId: post._id }).count();
        return commentsCount;
      },
    },
  },

  comments: {
    type: Object,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      arguments: 'limit: Int = 5',
      type: '[Comment]',
      resolver: (post, { limit }, { currentUser, Users, Comments }) => {
        const comments = Comments.find({ postId: post._id }, { limit }).fetch();

        // restrict documents fields
        const viewableComments = _.filter(comments, comments =>
          Comments.checkAccess(currentUser, comments)
        );
        const restrictedComments = Users.restrictViewableFields(
          currentUser,
          Comments,
          viewableComments
        );

        return restrictedComments;
      },
    },
  },

  emailShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => getEmailShareUrl(post),
    },
  },

  twitterShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => getTwitterShareUrl(post),
    },
  },

  facebookShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => getFacebookShareUrl(post),
    },
  },
};

export default schema;
