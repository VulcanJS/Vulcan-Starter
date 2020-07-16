import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Forms';

const text = [
  `
We now have a mutation that creates new movies, so now let's build a form that takes advantage of it. 

One of Vulcan's great features is that it can generate forms for you from a collection's schema. This means that all we need to do in order to get a "New Movie" form is specify the collection, in this case \`Movies\`. 

Additionally, in this case since we want our movie to show up in the same list as all the others once it's inserted, we'll specify a \`mutationFragmentName\` option to make sure the movie we get back from the server after the mutation has the same "shape" as the one already loaded on the client (including our special \`user\` field). 

Find \`MoviesNew.jsx\` and uncomment the following:
`,
  `
~~~js
<Components.SmartForm collection={Movies} mutationFragmentName="MovieFragment"/>
~~~
`,
];

const after = `
By the way, you can build forms to edit documents the same way. Just pass an additional \`documentId\` prop to \`Components.SmartForm\` with the \`_id\` of the document you want to edit, and Vulcan will take care of the rest. 
`;

// TODO check

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [{ file: '/lib/components/movies/MoviesNew.jsx', string: 'SmartForm' }];

export default Step;
