/*

Two resolvers are defined:

- multi (e.g.: movies (terms: JSON, offset: Int, limit: Int) )
- single (e.g.: movie (_id: String) )

*/

// basic multi and single resolvers
const resolvers = {
  multi: {
    name: 'movies',

    async resolver(root, args, context) {
      const { input: {terms = {}} = {terms: {}} } = args;
      let { selector, options } = await context.Movies.getParameters(terms, {}, context.currentUser);
      movies = await context.Movies.find(selector, options);
      moviesContent = movies.fetch();
      moviesCount = movies.count();
      return { results: moviesContent, totalCount: moviesCount };
    },
  },

  single: {
    name: 'movie',

    resolver(root, args, context) {
      const _id = args.input.selector.documentId || args.input.selector._id; // we keep this for backwards comp until SmartForm passes _id as a prop
      const document = context.Movies.findOne({ _id: _id });
      return { result: context.Users.restrictViewableFields(context.currentUser, context.Movies, document) };
    },
  },
};

export default resolvers;
