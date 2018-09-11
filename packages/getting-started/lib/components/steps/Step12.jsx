import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Field Resolvers

const text = [`
Let's keep learning how to harness the power of GraphQL. One of GraphQL's coolest features is that you're not limited to the fields that are in your database. In fact, GraphQL couldn't care less about your database: it only follows what *you* specify. 

This means that even though our database and JavaScript schema contain a \`userId\` field of type \`String\`, we can make our GraphQL schema contain a \`user\` field of type \`User\` instead!

In Vulcan, this is done through [field resolvers](http://docs.vulcanjs.org/field-resolvers.html).

Find the \`userId\` field in your \'lib/modules/schema.js\' file and add the following property to it:
`,`
~~~js
resolveAs: {
  fieldName: 'user',
  type: 'User',
  resolver: async (movie, args, context) => {
    return await context.Users.loader.load(movie.userId);
  },
  addOriginalField: true,
},
~~~
`,`
We're specifying a few things here:

- Our new GraphQL schema field should be named \'user\'. 
- It should return an object of type \`User\` (which is the \`Users\` collection's type, as defined in the \`vulcan:users\` core package).
- To get that object, it should execute the function included as the \`resolver\` property.
- We want to also add the original field (\`userId\`) to the GraphQL schema in case we need it. 

That function's first argument is the current document, in other words whichever movie is currently being fetched through the GraphQL endpoint. The second is any query arguments for that specific field (in this case we can ignore it), and the third is the \`context\`, which provides easy access to all existing collections including \`Users\`. 

Knowing all this, we can then call \`context.Users.loader.load\` to load the user with the \`movie.userId\` ID. This is a special dataloading helper that will fetch data from your Mongo database in a [performance-optimized](http://docs.vulcanjs.org/performance.html#Caching-amp-Batching) manner.

One more thing: we need to ask for that \`user\` field in our \`MoviesFragment\` fragment. Go to \`lib/modules/fragments.js\` and modify the fragment like so:
`,`
~~~js
fragment MoviesFragment on Movie {
  _id
  createdAt
  name
  user{
    displayName
  }
}
~~~
`];

const after = `
If you're seeing every user's \`displayName\` next to their review, this means our custom field resolver worked! 

And as you can see, the *graph* part of *GraphQL* means we can traverse our API graph using nested structures and leveraging each type's existing resolvers, without needing to actually store each user's \`displayName\` inside our \`Movies\` documents. 
`;

const Step12 = () => (
  <Components.Step step={12} text={text} after={after} />
);

registerComponent({ name: 'Step12', component: Step12 });