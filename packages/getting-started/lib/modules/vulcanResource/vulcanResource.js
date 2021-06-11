/**
 * Inspired by next-frontend/src/models/sampleModel.ts
 * /!\ this file must stay a pure JavaScript file for Meteor to work, no TypeScript
 *
 */
export const vulcanResourceSchema = {
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['owners'],
  },
  url: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['owners'],
  },
};

export const vulcanResourcePermissions = {
  canCreate: ['member'],
  canUpdate: ['owners', 'admins'],
  canDelete: ['owners', 'admins'],
  canRead: ['members', 'admins'],
};
