import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Custom Mutations';

const text = [
  `
So far a lot of our work has revolved around understanding the various helpers and shortcuts that Vulcan provides. But it's also worth knowing how to do things on your own when you need to. 

For example, let's imagine that we wanted to create a new, custom \`markAsWatched\` mutation that lets us set any movie's \`isWatched\` property to \`true\`. 

Now Vulcan does provide a \`useUpdate2\` hook we could use to call \`updateMovie\` with \`{ isWatched: true }\`, but for learning's sake let's instead write our own mutation from scratch. 
  
Find \`/lib/server/mark_as_watched.js\` and uncomment the last two lines. This will do two things:

1. Call \`addGraphQLResolvers()\` to merge our new \`markAsWatched\` object with the existing GraphQL resolver tree.
2. Call \`addGraphQLMutation()\` to add our mutation to our GraphQL type definition.

Notice that it's important to do both! Our GraphQL API needs to both know that the \`markAsWatched\` mutation exists, and also what to know when said mutation is called.

Also, some more detail about the mutation resolver function itself. \`updateMutator\` is one of Vulcan's standard read/update/delete [mutator](https://docs.vulcanjs.org/mutations.html#Default-Mutators), in other words the function that does the heavy lifting when we want to modify something. You can think of it as a basic database operation with an added layer of validation and callbacks. 
`,
  `
Now that our mutation exists, let's call it! We'll do so using the handy \`<Components.MutationButton />\` helper component, which provides a special button that can trigger any server-side mutation. Find file \`lib/components/movies/MoviesApp2.jsx\` and uncomment the following line:
`,
  `
~~~js
{ name: 'isWatched', component: MoviesMarkAsWatched }
~~~`,
];

const after = `
Can you see our brand new checkmark button? If you look at the code for the \`MoviesMarkAsWatched\` component, you'll see that we're giving the component everything it needs to do the GraphQL request for us: the mutation name, the mutation arguments type definition, and the fragment we expect to receive in return. 

This is a great example of combining custom code (the GraphQL mutation) with premade Vulcan building blocks (the mutation button). This ability to smoothly combine both is exactly what makes Vulcan so powerful!
`;

// TODO check

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [
  { file: '/lib/server/mark_as_watched.js', string: 'addGraphQLMutation(`markAsWatched(movieId: String): Movie`)' },
  { file: '/lib/components/movies/MoviesApp2.jsx', string: `{ name: 'isWatched', component: MoviesMarkAsWatched }` },
];

export default Step;
