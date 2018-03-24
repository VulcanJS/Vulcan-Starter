import { Components } from 'meteor/vulcan:core';

const schema = {
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: document => {
      return new Date();
    },
  },

  userName: {
    label: 'Your name',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['guests'],
    editableBy: ['admins'],
  },
  sendToEmail: {
    label: 'Your email',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['guests'],
    editableBy: ['admins'],
  },
  emailContent: {
    label: 'Write a message',
    type: String,
    optional: false,
    control: 'FormComponentTextarea',
    viewableBy: ['guests'],
    insertableBy: ['guests'],
    editableBy: ['admins'],
  },
};

export default schema;
