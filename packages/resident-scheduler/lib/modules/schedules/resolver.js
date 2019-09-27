const resolvers = {

    multi: {
        name: 'schedules',
    
        async resolver(root, args, context) {
          const { input: {terms = {}} = {terms: {}} } = args;
          console.log("RESOLVER *****")
          console.log(args)
          console.log(terms)
          let { selector, options } = await context.Schedules.getParameters(terms, {}, context.currentUser);
          console.log(selector)
          console.log(options)
          const schedules = await context.Schedules.find(selector, options);
          const schedulesContent = schedules.fetch();
          const schedulesCount = schedules.count();
          return { results: schedulesContent, totalCount: schedulesCount };
        },
      },
    
      single: {
        name: 'schedule',
    
        resolver(root, args, context) {
          const _id = args.input.selector.documentId || args.input.selector._id; // we keep this for backwards comp until SmartForm passes _id as a prop
          const document = context.Schedules.findOne({ _id: _id });
          return { result: context.Users.restrictViewableFields(context.currentUser, context.Schedules, document) };
        },
      },
  };
  
  export default resolvers;