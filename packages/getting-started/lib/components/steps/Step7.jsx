import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Components } from 'meteor/vulcan:core';
import Step from './Step.jsx';

// The GraphQL Schema

const text = `
Collection schemas are used to make sure your data is properly formatted before inserting it in the database, but they also have one more important purpose: generating your *GraphQL* schema. 

[GraphQL](http://graphql.org) is the technology used to power Vulcan's data layer, in other words make your server-side data available to the browser. 

Every GraphQL API endpoint needs a schema to indicate what data should be made available to clients, and in Vulcan that *GraphQL* schema is automatically generated for you from the *JavaScript* schema you wrote in Step 5. 

That GraphQL schema lives on the server, so in order to visualize it we need some way of fetching it from the client. That's where hooks will come in handy, more specifically Apollo Client's [\`useQuery\` hook](https://www.apollographql.com/docs/react/api/react-hooks/#usequery).

Find the \`lib/components/steps/Step7.jsx\` file for this component, uncomment the \`useQuery\` line, and prepare to scroll down a lot.
`;

const after = `
Congrats, you can now behold your GraphQL schema in all its glory!

Let's quickly review it.

1. Anything that starts with \`type\` is a GraphQL type definition. It simply declares what properties the objects that make up your schema should have. 
2. Types starting with \`input\` are special **input types** used to define the properties of mutation arguments. 
3. The \`Query\` type is a special type whose properties define which queries (fetching data) your GraphQL endpoint can receive. 
4. Similarly, the \`Mutation\` type does the same thing for mutations (modifying data).

By the way, this would be a great time to start using the [React Devtools](https://github.com/facebook/react-devtools). For example, if you inspect the \`Step7\` component (select the “React” tab of your devtools then search for “Step7”) you can review this component's structure.
`;

const query = gql`
  query schemaContents {
    schemaContents
  }
`;

const Step7 = () => {
  const items = {};
  items.data = useQuery(query).data; // uncomment on #Step7;
  return (
    <Step step={7} text={text} after={after} items={items}>
      {items.data && <Components.GraphQLSchema data={items.data} />}
    </Step>
  );
};

export default Step7;
