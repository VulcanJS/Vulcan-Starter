import { Posts } from '../posts/index.js';

Posts.addField([
  {
    fieldName: 'url',
    fieldSchema: {
      input: 'EmbedURL', // we are just extending the field url, not replacing it
    }
  },
  {
    fieldName: 'thumbnailUrl',
    fieldSchema: {
      type: String,
      optional: true,
      canCreate: ['members'],
      canUpdate: ['members'],
      canRead: ['guests'],
      hidden: true
    }
  },
  {
    fieldName: 'media',
    fieldSchema: {
      type: Object,
      optional: true,
      blackbox: true,
      canRead: ['guests'],
    }
  },
  {
    fieldName: 'sourceName',
    fieldSchema: {
      type: String,
      optional: true,
      canRead: ['guests'],
    }
  },
  {
    fieldName: 'sourceUrl',
    fieldSchema: {
      type: String,
      optional: true,
      canRead: ['guests'],
    }
  }
]);