import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const text = `
## Forms

We've got a mutation that creates new movies, so now let's build a form that takes advantage of it. 

One of Vulcan's great features is that it can generate forms for you from a collection's schema. This means that all we need to do in order to get a "New Movie" form is specify the collection, in this case \`Movies\`. 

Additionally, in this case since we want our movie to show up in the same list as all the others once it's inserted, we'll specify a \`mutationFragmentName\` option to make sure the movie we get back from the server after the mutation has the same "shape" as the one already loaded on the client (including our special \`user\` field). 

Find \`Step12.jsx\` and add the following above the \`MoviesList\` component:

~~~
<Components.SmartForm collection={Movies} mutationFragmentName="MoviesFragment"/>
~~~
`;

const after = `
By the way, you can build forms to edit documents the same way. Just pass an additional \`documentId\` prop to \`Components.SmartForm\` with the \`_id\` of the document you want to edit, and Vulcan will take care of the rest. 
`;

const Step15 = ({ results, loading }) => (
  <Components.Step step={15} text={text} after={after} results={results}>
    <Components.SmartForm collection={Movies} mutationFragmentName="MoviesFragment"/> {/* <- add form here */}
    <Components.MoviesList loading={loading} results={results}/>
  </Components.Step>
);

const options = {
  collection: Movies,
  fragmentName: 'MoviesFragment'
}

registerComponent('Step15', Step15, [withList, options]);