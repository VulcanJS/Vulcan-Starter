import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';
import StepWrapper from './StepWrapper.jsx';
import Mutations from '../other/Mutations.jsx';

export const title = 'Mutations';

const text = `
We've seen how to load data, and how to create a user account. Now how about using that fresh-out-the-oven user account to *mutate* some data?

Now don't worry, I'm not talking about giving data extra arms and the ability to shoot laser beams out of its eyes. What we mean by “mutation” is simply a function that modifies data on the server (in other words either creates, updates, or deletes a document).

Just like with resolvers, Vulcan offers some handy [auto-generated mutations](http://docs.vulcanjs.org/mutations.html#Default-Mutations).

Go to \`lib/components/steps/Step##step##.jsx\` and uncomment the \`useQuery\` hook. 
`;

const after = `
As you can see, our three \`createMovie\`, \`updateMovie\`, and \`deleteMovie\` mutations are ready to use. In other words, if we send down the proper mutation, our GraphQL endpoint will be able to understand it and create, edit, or delete a document in our database. 

By the way, we've been talking about auto-generated mutations but you can also [write your own](http://docs.vulcanjs.org/mutations.html#GraphQL-Mutations) create, update, and delete mutations resolvers on the server if you need to (and the same also goes for the multi and single query resolvers). 
`;

const query = gql`
  query MutationResolvers {
    __type(name: "Mutation") {
      fields {
        name
      }
    }
  }
`;

const Step = () => {
  const items = {};
  // uncomment the hook on #Step13
  // const { data } = useQuery(query);
  // items.mutations = get(data, '__type.fields');
  return (
    <StepWrapper title={Step.title} text={text} after={after} check={() => !!items.mutations}>
      <Mutations mutations={items.mutations} />
    </StepWrapper>
  );
};

export const checks = [{ string: `items.mutations = get(data, '__type.fields')` }];

export default Step;
