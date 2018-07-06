const schema = {
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    onCreate: () => {
      return new Date();
    },
  },

  name: {
    type: String,
    optional: false,
    canRead: ['guests'],
    canUpdate: ['members'],
    canCreate: ['members'],
  },
};

export default schema;
