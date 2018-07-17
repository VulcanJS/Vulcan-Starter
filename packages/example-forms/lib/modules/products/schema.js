const schema = {
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    onInsert: (document, currentUser) => {
      return new Date();
    },
  },

  name: {
    type: String,
    optional: false,
    viewableBy: ['guests'],
    editableBy: ['members'],
    insertableBy: ['members'],
  },
};

export default schema;
