const resolvers = {

    multi: {
        name: 'departments',
    
        async resolver(root, args, context) {
          const { input: {terms = {}} = {terms: {}} } = args;
          console.log("RESOLVER *****")
          console.log(args)
          console.log(terms)
          let { selector, options } = await context.Departments.getParameters(terms, {}, context.currentUser);
          console.log(selector)
          console.log(options)
          const departments = await context.Departments.find(selector, options);
          const departmentsContent = departments.fetch();
          const departmentsCount = departments.count();
          return { results: departmentsContent, totalCount: departmentsCount };
        },
      },
    
      single: {
        name: 'department',
    
        resolver(root, args, context) {
          const _id = args.input.selector.documentId || args.input.selector._id; // we keep this for backwards comp until SmartForm passes _id as a prop
          const document = context.Departments.findOne({ _id: _id });
          return { result: context.Users.restrictViewableFields(context.currentUser, context.Departments, document) };
        },
      },
  };
  
  export default resolvers;