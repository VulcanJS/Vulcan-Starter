/*

Posts schema

*/

import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting, getCollection } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';

registerSetting('forum.postExcerptLength', 30, 'Length of posts excerpts in words');

/**
 * @summary Posts config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2
  }
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
    }
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
    onCreate: ({newDocument: post, currentUser}) => {
      // Set the post's postedAt if it's going to be approved
      if (!post.postedAt && getCollection('Posts').getDefaultStatus(currentUser) === getCollection('Posts').config.STATUS_APPROVED) {
        return new Date();
      }
    },
    onUpdate: ({data, document: post}) => {
      // Set the post's postedAt if it's going to be approved
      if (!post.postedAt && data.status === getCollection('Posts').config.STATUS_APPROVED) {
        return new Date();
      }
    }
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
    searchable: true
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({newDocument: post}) => {
      return Utils.slugify(post.title);
    },
    onUpdate: ({data}) => {
      if (data.title) {
        return Utils.slugify(data.title);
      }
    }
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
    order: 30
  },
  /**
    HTML version of the post body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({newDocument: post}) => {
      if (post.body) {
        return Utils.sanitize(marked(post.body));
      }
    },
    onUpdate: ({data}) => {
      if (data.body) {
        return Utils.sanitize(marked(data.body));
      }
    }
  },
  /**
   Post Excerpt
   */
  excerpt: {
    type: String,
    optional: true,
    canRead: ['guests'],
    searchable: true,
    onCreate: ({newDocument: post}) => {
      if (post.body) {
        // excerpt length is configurable via the settings (30 words by default, ~255 characters)
        const excerptLength = getSetting('forum.postExcerptLength', 30); 
        return Utils.trimHTML(Utils.sanitize(marked(post.body)), excerptLength);
      }
    },
    onUpdate: ({data}) => {
      if (data.body) {
        const excerptLength = getSetting('forum.postExcerptLength', 30); 
        return Utils.trimHTML(Utils.sanitize(marked(data.body)), excerptLength);
      }
    }
  },
  /**
    Count of how many times the post's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true,
    canRead: ['admins'],
    defaultValue: 0
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
    defaultValue: 0
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
    onCreate: ({newDocument: document, currentUser}) => {
      if (!document.status) {
        return getCollection('Posts').getDefaultStatus(currentUser);
      }
    },
    onUpdate: ({data, currentUser}) => {
      // if for some reason post status has been removed, give it default status
      if (data.status === null) {
        return getCollection('Posts').getDefaultStatus(currentUser);
      }
    },
    options: () => getCollection('Posts').statuses,
    group: formGroups.admin
  },
  /**
    Whether a post is scheduled in the future or not
  */
  isFuture: {
    type: Boolean,
    optional: true,
    canRead: ['guests'],
    onCreate: ({newDocument: post}) => {
      // Set the post's isFuture to true if necessary
      if (post.postedAt) {
        const postTime = new Date(post.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        return postTime > currentTime; // round up to the second
      }
    },
    onUpdate: ({data, document: post}) => {
      // Set the post's isFuture to true if necessary
      if (data.postedAt) {
        const postTime = new Date(data.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        if (postTime > currentTime) {
          // if a post's postedAt date is in the future, set isFuture to true
          return true;
        } else if (post.isFuture) {
          // else if a post has isFuture to true but its date is in the past, set isFuture to false
          return false;
        }
      }
    }
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
    onCreate: ({newDocument: post}) => {
      if(!post.sticky) {
        return false;
      }
    },
    onUpdate: ({data}) => {
      if (!data.sticky) {
        return false;
      }
    }
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
    The post author's name
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
      resolver: async (post, args, context) => {
        if (!post.userId) return null;
        const user = await context.Users.loader.load(post.userId);
        return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
      },
      addOriginalField: true
    },
  },

  /**
    Used to keep track of when a post has been included in a newsletter
  */
  scheduledAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
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
    }
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getPageUrl(post, true);
      },
    }
  },

  linkUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return post.url ? Utils.getOutgoingUrl(post.url) : Posts.getPageUrl(post, true);
      },
    }
  },

  postedAtFormatted: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, context) => {
        return moment(post.postedAt).format('dddd, MMMM Do YYYY');
      }
    }
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
    }
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
        const viewableComments = _.filter(comments, comments => Comments.checkAccess(currentUser, comments));
        const restrictedComments = Users.restrictViewableFields(currentUser, Comments, viewableComments);

        return restrictedComments;
      }
    }
  },

  emailShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getEmailShareUrl(post);
      }
    }
  },

  twitterShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getTwitterShareUrl(post);
      }
    }
  },

  facebookShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getFacebookShareUrl(post);
      }
    }
  },

};

export default schema;
