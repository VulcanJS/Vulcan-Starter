import React from 'react';
import { Components, registerComponent, Collections } from 'meteor/vulcan:core';

import withGraphQLSchema from '../../hocs/withGraphQLSchema.js';

// The GraphQL Schema

const text = `
Collection schemas are used to make sure your data is properly formatted before inserting it in the database, but they also have one more important purpose: generating your *GraphQL* schema. 

[GraphQL](http://graphql.org) is the technology used to power Vulcan's data layer, in other words make your server-side data available to the browser. 

Every GraphQL API endpoint needs a schema to indicate what data should be made available to clients, and in Vulcan that *GraphQL* schema is automatically generated for you from the *JavaScript* schema you wrote in Step 5. 

That GraphQL schema lives on the server, so in order to visualize it we need some way of fetching it from the client. 

Find the \`lib/components/steps/Step7.jsx\` file for this component, uncomment the last argument of the \`registerComponent\` call, \`withGraphQLSchema\`, and prepare to scroll down a lot.
`;

const after = `
Congrats, you can now behold your GraphQL schema in all its glory!

By the way, \`withGraphQLSchema\` is what's known as a **higher-order component**, or “HoC” for short. These are functions you can call on a component to perform special actions (such as querying the server) and passing them special props (such as the results of that query).

We'll learn more about them later, but for now all you need to know is that the first argument of \`registerComponent\` is the component name, the second is the component itself, and any additional arguments will be treated as HoCs and called on the component whenever it's used in your app. 

You don't need to know how HoCs are written in order to use them, but if you're curious then you can learn more in the [Apollo documentation](https://www.apollographql.com/docs/react/basics/queries.html).

By the way, this would be a great time to start using the [React Devtools](https://github.com/facebook/react-devtools). For example, if you inspect the \`Step7\` component (select the “React” tab of your devtools then search for “Step7”) you'll see the \`data\` prop that it's receiving from \`withGraphQLSchema(Step7)\`.
`;

const Step7 = ({ data }) => (
  <Components.Step step={7} text={text} after={after} data={data}>
    {data && <Components.GraphQLSchema data={data}/>}
  </Components.Step>
);

registerComponent({ name: 'Step7', component: Step7, hocs: [ withGraphQLSchema ] }); // uncomment on #Step7