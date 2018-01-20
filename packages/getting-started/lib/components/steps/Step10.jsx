import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const text = `
## Loading Data

We already know that Vulcan uses HoCs to load data. Up to now, we've been using specific pre-written HoCs as part of this tutorial, but just like we've looked at default resolvers, we'll now look at Vulcan's core default HoCs. 

These two HoCs, \`withList\` and \`withDocument\`, can be used to load a list of documents or a single document respecively with a minimal amount of manual work. 

Find the file for this component in \`lib/components/steps/Step10.jsx\` and uncomment \`[withList, options]\` in the \`registerComponent\` line. 
`;

const after = `
Wow, look at that! The \`withList\` component did its job and loaded a list of movies for us. And all we had to do was to pass it a \`collection\` option to indicate where to load data from.

You might be wondering about the weird \`[withList, options]\` syntax. This is just a small hack to delay calling the \`withList\` function until later on. If that doesn't make any sense to you, feel free to ignore it for now and just copy-and-paste this syntax structure. 
`;

const Step10 = ({ results, loading }) => (
  <Components.Step step={10} text={text} after={after} results={results}>
    {loading ? 
      <Components.Loading/> :
      <Components.MoviesList loading={loading} results={results}/>
    }
  </Components.Step>
);

const options = {
  collection: Movies
}

registerComponent('Step10', Step10, [withList, options]);
