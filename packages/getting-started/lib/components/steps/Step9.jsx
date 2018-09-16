import React from 'react';
import { Components, registerComponent, Collections } from 'meteor/vulcan:core';

import withQueryResolvers from '../../hocs/withQueryResolvers.js';

// Resolvers

const text = `
Now that our data exists on the server, let's think about transmitting it to the client. 

It's important to realize that just because the data is available in our database doesn't mean the client can access it. After all, that wouldn't be very secure!

On the other hand, we do know that the client can connect to the GraphQL endpoint. In other words, if we can connect the endpoint to our database, we'll have managed to close the loop. And we can do this using a **resolver**. 

A GraphQL resolver is basically a function that waits for any GraphQL queries mentioning a specific field, and then provides some data in return. In previous steps we actually already used two resolvers in the background, \`SchemaContents\` and \`MoviesCount\`. 

These two resolvers were written specifically for this tutorial and are fairly limited, but we'll now unlock the power of Vulcan's **default resolvers**.

Go back to \`lib/modules/collection.js\` and uncomment the \`resolvers: getDefaultResolvers('Movies')\` line. 
`;

const after = [`
Nice work! Notice the two \`movies\`, and \`movie\` resolvers in there? Those are our default resolvers. Behind the scenes, they'll fetch the data we need in the database and pass it on to the API layer. 

By the way, we didn't even have to write a custom resolver to get this list of resolvers. Turns out GraphQL supports **introspection queries**, which let you get metadata about your own schema, in this case using the following GraphQL query (try it now in [GraphiQL](http://localhost:3000/graphiql)!):
`,`
~~~gq
query QueryResolvers{
  __type(name:"Query") {
    fields {
      name
    }
  }
}
~~~
`]

const Step9 = ({ resolvers }) => (
  <Components.Step step={9} text={text} after={after} resolvers={resolvers}>
    <div className="query-resolvers">
      <ul>
        {resolvers && resolvers.fields.map(resolver =>
          <li key={resolver.name}>
            {['MoviesList', 'MoviesSingle', 'MoviesTotal'].includes(resolver.name) ? 
              <strong>{resolver.name}</strong> : 
              <span>{resolver.name}</span>
            }
          </li>
        )}
      </ul>
    </div>
  </Components.Step>
);

registerComponent({ name: 'Step9', component: Step9, hocs: [withQueryResolvers] });
