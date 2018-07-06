import Users from 'meteor/vulcan:users';

const notificationsGroup = {
  name: "notifications",
  order: 2
};

// Add notifications options to user profile settings
Users.addField([
  {
    fieldName: 'notifications_users',
    fieldSchema: {
      label: 'New users',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: "checkbox",
      canRead: ['guests'],
      canCreate: ['admins'],
      canUpdate: ['admins'],
      group: notificationsGroup,
    }
  },
  {
    fieldName: 'notifications_posts',
    fieldSchema: {
      label: 'New posts',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: "checkbox",
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    }
  },
  {
    fieldName: 'notifications_comments',
    fieldSchema: {
      label: 'Comments on my posts',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: "checkbox",
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    }
  },
  {
    fieldName: 'notifications_replies',
    fieldSchema: {
      label: 'Replies to my comments',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: "checkbox",
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    }
  }
]);  
