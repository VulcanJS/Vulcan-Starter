import React from 'react';
import { Components, registerComponent, withMulti } from 'meteor/vulcan:core';

import withMutationResolvers from '../../hocs/withMutationResolvers.js';

// Mutations

const text = `
We've seen how to load data, and how to create a user account. Now how about using that fresh-out-the-oven user account to *mutate* some data?

Now don't worry, I'm not talking about giving data extra arms and the ability to shoot laser beams out of its eyes. What we mean by “mutation” is simply a function that modifies data on the server (in other words either creates, updates, or deletes a document).

Just like with resolvers, Vulcan offers some handy [auto-generated mutations](http://docs.vulcanjs.org/mutations.html#Default-Mutations).

Go to \`lib/components/steps/Step14.jsx\` and uncomment the \`<Components.Mutations />\` line. 
`;

const after = `
As you can see, our three \`createMovie\`, \`updateMovie\`, and \`deleteMovie\` mutations are ready to use. In other words, if we send down the proper mutation, our GraphQL endpoint will be able to understand it and create, edit, or delete a document in our database. 

By the way, we've been talking about auto-generated mutations but you can also [write your own](http://docs.vulcanjs.org/mutations.html#GraphQL-Mutations) Create, Update, and Delete mutations resolvers on the server if you need to (and the same also goes for the Multi, Single, and Total query resolvers). 
`

// uncomment the component's child on #Step14

const Step14 = () => (
  <Components.Step step={14} text={text} after={after}>
    {/* <Components.Mutations /> */}
  </Components.Step>
);

registerComponent({ name: 'Step14', component: Step14 });