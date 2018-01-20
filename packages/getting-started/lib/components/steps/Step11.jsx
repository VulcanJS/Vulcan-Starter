import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const text = `
## Fragments

Our dummy reviews are fairly short, but what if they were each several thousand words long? In that case, we probably wouldn't want to load them all in our list view.

Thankfully, one of GraphQL's perks is the ability to specify exactly what data you need, down to the individual field. And Vulcan makes it super-easy through [fragments](http://docs.vulcanjs.org/fragments.html).

We didn't pass any fragment to our \`withList\` HoC so it's just doing its best to guess what we want and ask for any field it can find. But let's specify a fragment to fix this. 

Find the \`options\` object in this component's file (\`Step11.jsx\`) and add a \`fragmentName: 'MovieFragment'\` property to it. 

That fragment has already been defined, and it looks something like this:

~~~
fragment MoviesItem on Movie {
  _id
  name
}
~~~

`;

const after = `
As you can see, the \`review\` field is now gone.
`;

const Step11 = ({ results, loading }) => (
  <Components.Step step={11} text={text} after={after} results={results}>
    <Components.MoviesList loading={loading} results={results}/>
  </Components.Step>
);

const options = {
  collection: Movies,
  fragmentName: 'MoviesFragment' // add fragment name here
}

registerComponent('Step11', Step11, [withList, options]);
