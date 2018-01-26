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
    onInsert: () => {
      return new Date();
    }
  },

  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    /*

    Uncomment on #Step12:

    */
    // resolveAs: {
    //   fieldName: 'user',
    //   type: 'User',
    //   resolver: async (movie, args, context) => {
    //     return await context.Users.loader.load(movie.userId);
    //   },
    //   addOriginalField: true,
    // },
  },

  name: {
    label: 'Name',
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true,
  },

  review: {
    label: 'Review',
    type: String,
    optional: true,
    control: 'textarea',
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true,
  },

};

export default schema;
