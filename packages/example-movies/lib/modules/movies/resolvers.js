/*

Three resolvers are defined:

- list (e.g.: moviesList(terms: JSON, offset: Int, limit: Int) )
- single (e.g.: moviesSingle(_id: String) )
- listTotal (e.g.: moviesTotal )

*/

// basic list, single, and total query resolvers
const resolvers = {

  multi: {

    name: 'movies',

    async resolver(root, {terms = {}}, context, info) {
      let {selector, options} = await context.Movies.getParameters(terms, {}, context.currentUser);
      return {results: context.Movies.find(selector, options).fetch()};
    },

  },

  single: {
    
    name: 'movie',

    resolver(root, args, context) {
      const _id =  args.input.selector.documentId || args.input.selector._id; // we keep this for backwards comp until SmartForm passes _id as a prop
      const document = context.Movies.findOne({_id: _id});
      return {result: context.Users.restrictViewableFields(context.currentUser, context.Movies, document)}
    },
  
  },
};

export default resolvers;
