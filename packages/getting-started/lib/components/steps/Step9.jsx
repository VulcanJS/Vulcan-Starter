import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Fragments';

const text = [
  `
Our dummy reviews are fairly short, but what if they were each several thousand words long? In that case, we probably wouldn't want to load them all in our list view.

Thankfully, one of GraphQL's perks is the ability to specify exactly what data you need, down to the individual field. And Vulcan makes it super-easy through [fragments](http://docs.vulcanjs.org/fragments.html).

We didn't pass any fragment to our \`useMulti2\` hook so it's just doing its best to guess what we want and ask for any field it can find. But let's specify a fragment to fix this. 

Find \`fragmentName: 'MovieFragment'\` option of the hook in \`MoviesList.jsx\` and uncomment it. 

That fragment has already been defined, and it looks something like this:
`,
  `
~~~gq
fragment MovieFragment on Movie {
  _id
  createdAt
  name
}
~~~
`,
];

const after = `
As you can see, since the \`review\` field wasn't included in the fragment, it's no longer being sent to the client.
`;

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [{ file: '/lib/components/movies/MoviesList.jsx', string: 'fragmentName' }];

export default Step;
