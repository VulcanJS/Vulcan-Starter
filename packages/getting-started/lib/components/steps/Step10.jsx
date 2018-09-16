import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Loading Data

const text = `
We already know that Vulcan uses HoCs to load data. Up to now, we've been using specific pre-written HoCs as part of this tutorial, but just like we've looked at default resolvers, we'll now look at Vulcan's core default HoCs. 

These two HoCs, \`withMulti\` and \`withSingle\`, can be used to load a list of documents or a single document respecively with a minimal amount of manual work. 

Find the \`MoviesList\` component in \`lib/components/movies/MoviesList.jsx\` and uncomment \`[withMulti, options]\` in the \`registerComponent\` line. 
`;

const after = `
Wow, look at that! The \`withMulti\` component did its job and loaded a list of movies for us. And all we had to do was to pass it a \`collection\` option to indicate where to load data from.

You might be wondering about the weird \`[withMulti, options]\` syntax. This is just a small hack to delay calling the \`withMulti\` function until later on. If that doesn't make any sense to you, feel free to ignore it for now and just copy-and-paste this syntax structure. 
`;

const Step10 = () => (
  <Components.Step step={10} text={text} after={after} />
);

registerComponent({ name: 'Step10', component: Step10 });
