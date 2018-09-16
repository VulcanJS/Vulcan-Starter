import React from 'react';
import { Components, registerComponent, withMulti } from 'meteor/vulcan:core';

// Forms

const text = [`
We've got a mutation that creates new movies, so now let's build a form that takes advantage of it. 

One of Vulcan's great features is that it can generate forms for you from a collection's schema. This means that all we need to do in order to get a "New Movie" form is specify the collection, in this case \`Movies\`. 

Additionally, in this case since we want our movie to show up in the same list as all the others once it's inserted, we'll specify a \`mutationFragmentName\` option to make sure the movie we get back from the server after the mutation has the same "shape" as the one already loaded on the client (including our special \`user\` field). 

Find \`MoviesNew.jsx\` and add the following:
`,`
~~~js
<Components.SmartForm collection={Movies} mutationFragmentName="MoviesFragment"/>
~~~
`];

const after = `
By the way, you can build forms to edit documents the same way. Just pass an additional \`documentId\` prop to \`Components.SmartForm\` with the \`_id\` of the document you want to edit, and Vulcan will take care of the rest. 
`;

const Step15 = () => (
  <Components.Step step={15} text={text} after={after} />
);

registerComponent({ name: 'Step15', component: Step15 });