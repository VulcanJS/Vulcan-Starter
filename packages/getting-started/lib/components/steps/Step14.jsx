import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import withMutationResolvers from '../../hocs/withMutationResolvers.js';

const text = `
## Mutations

We've seen how to load data, and how to create a user account. Now how about using that fresh-out-the-oven user account to *mutate* some data?

Now don't worry, I'm not talking about giving data extra arms and the ability to shoot laser beams out of its eyes. What we mean by “mutation” is simply a function that modifies data on the server (in other words either inserts, edits, or removes a document).

Just like with resolvers, Vulcan offers some handy [default mutations](http://docs.vulcanjs.org/mutations.html#Default-Mutations).

Go back to \`lib/modules/collection.js\` and this time uncomment the \`mutations: getDefaultMutations('Movies')\` line. 
`;

const after = `
Our three \`MoviesNew\`, \`MoviesEdit\`, and \`MoviesRemove\` mutations are now ready to use. In other words, if we send down the proper query, our GraphQL endpoint will be able to understand it and create, edit, or delete a document in our database. 

By the way, we've been talking about “default” mutations but you can also [write your own](http://docs.vulcanjs.org/mutations.html#GraphQL-Mutations) new, edit, and remove mutations on the server if you need to (and the same goes for the list, single, and total resolvers). 
`

const Step14 = ({ data }) => (
  <Components.Step step={14} text={text} after={after} data={data}>
    <div className="mutation-resolvers">
      <ul>
        {data && data.__type && data.__type.fields.map(resolver =>
          <li key={resolver.name}>
            {['MoviesNew', 'MoviesEdit', 'MoviesRemove'].includes(resolver.name) ? 
              <strong>{resolver.name}</strong> : 
              <span>{resolver.name}</span>
            }
          </li>
        )}
      </ul>
    </div>
  </Components.Step>
);

registerComponent('Step14', Step14, withMutationResolvers);