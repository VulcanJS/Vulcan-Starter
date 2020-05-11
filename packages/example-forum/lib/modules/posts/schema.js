/*

Posts schema

*/

import Users from 'meteor/vulcan:users';
import { Connectors, Utils, getSetting } from 'meteor/vulcan:core';
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
      query SiteDataQuery {
        siteData{
          logoUrl
          title
        }
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
    options: statusesOptions,
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
      fieldName: 'postedAtFormatted',
      resolver: post => {
        return moment(post.postedAt).format('dddd, MMMM Do YYYY');
      },
    },
  },
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
      relation: 'hasOne',
    },
  },
  categoriesIds: {
    type: Array,
    input: 'checkboxgroup',
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    options: ({ data }) =>
      data.categories.results.map(category => ({
        value: category._id,
        label: category.name,
        slug: category.slug,
      })),
    query: `
      query CategoriesQuery {
        categories{
          results{
            _id
            name
            slug
          }
        }
      }
      `,
    resolveAs: {
      fieldName: 'categories',
      type: '[Category]',
      relation: 'hasMany',
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
      relation: 'hasMany',
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

  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: post => {
        return getPageUrl(post, false);
      },
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: post => {
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

  // commentCount: {
  //   type: Number,
  //   optional: true,
  //   canRead: ['guests'],
  // },

  comments: {
    type: Object,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      arguments: 'limit: Int = 5',
      type: '[Comment]',
      resolver: async (post, { limit }, { currentUser, Users, Comments }) => {
        const comments = await Connectors.find(
          Comments,
          { postId: post._id },
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
