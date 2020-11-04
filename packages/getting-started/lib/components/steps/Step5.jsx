import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import StepWrapper from './StepWrapper.jsx';
import GraphQLSchema from '../other/GraphQLSchema.jsx';

export const title = 'The GraphQL Schema';

const text = `
Collection schemas are used to make sure your data is properly formatted before inserting it in the database, but they also have one more important purpose: generating your *GraphQL* schema. 

[GraphQL](http://graphql.org) is the technology used to power Vulcan's data layer, in other words make your server-side data available to the browser. 

Every GraphQL API endpoint needs a schema to indicate what data should be made available to clients, and in Vulcan that *GraphQL* schema is automatically generated for you from the *JavaScript* schema you wrote in Step 5. 

That GraphQL schema lives on the server, so in order to visualize it we need some way of fetching it from the client. That's where hooks will come in handy, more specifically Apollo Client's [\`useQuery\` hook](https://www.apollographql.com/docs/react/api/react-hooks/#usequery).

Find the \`lib/components/steps/Step5.jsx\` file for this component, uncomment the \`useQuery\` line, and prepare to scroll down a lot.
`;

const after = `
Congrats, you can now behold your GraphQL schema in all its glory!

Let's quickly review it.

1. Anything that starts with \`type\` is a GraphQL type definition. It simply declares what properties the objects that make up your schema should have. 
2. Types starting with \`input\` are special **input types** used to define the properties of mutation arguments. 
3. The \`Query\` type is a special type whose properties define which queries (fetching data) your GraphQL endpoint can receive. 
4. Similarly, the \`Mutation\` type does the same thing for mutations (modifying data).

By the way, during local development Vulcan automatically logs out your GraphQL schema whenever your app changes. Look for a \`schema.graphql\` file at the root of this project's directory. 
`;

const query = gql`
  query schemaContents {
    schemaContents
  }
`;

const Step = () => {
  const items = {};
  // uncomment on #Step5
  // items.data = useQuery(query).data; 
  return (
    <StepWrapper title={Step.title} text={text} after={after}>
      {items.data && <GraphQLSchema data={items.data} />}
    </StepWrapper>
  );
};

export const checks = [{ string: 'items.data = useQuery(query).data' }];

export default Step;
