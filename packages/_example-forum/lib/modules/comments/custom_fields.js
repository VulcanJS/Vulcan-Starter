import { Posts } from '../posts/index.js';
import Users from 'meteor/vulcan:users';

Users.addField([
  /**
    Count of the user's comments
  */
  {
    fieldName: 'commentCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      canRead: ['guests'],
    }
  }
]);