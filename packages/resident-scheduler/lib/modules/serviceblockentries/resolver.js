const resolvers = {

    multi: {
        name: 'serviceblockentries',
    
        async resolver(root, args, context) {
          const { input: {terms = {}} = {terms: {}} } = args;
          console.log("RESOLVER *****")
          console.log(args)
          console.log(terms)
          let { selector, options } = await context.Schedules.getParameters(terms, {}, context.currentUser);
          console.log(selector)
          console.log(options)
          const serviceblocks = await context.Schedules.find(selector, options);
          const serviceblocksContent = serviceblocks.fetch();
          const serviceblocksCount = serviceblocks.count();
          return { results: serviceblocksContent, totalCount: serviceblocksCount };
        },
      },
    
      single: {
        name: 'serviceblockentry',
    
        resolver(root, args, context) {
          const _id = args.input.selector.documentId || args.input.selector._id; // we keep this for backwards comp until SmartForm passes _id as a prop
          const document = context.Schedules.findOne({ _id: _id });
          return { result: context.Users.restrictViewableFields(context.currentUser, context.Schedules, document) };
        },
      },
  };
  
  export default resolvers;