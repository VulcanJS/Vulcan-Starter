import React from 'react';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Loading Data';

const text = `
We already know that Vulcan uses hooks to load data. Up to now, we've been using Apollo's regular \`useQuery\` hook as part of this tutorial, but it's now time to look at a couple Vulcan-specific hooks.

These two hooks, \`useMulti2\` and \`useSingle2\`, can be used to load a list of documents or a single document respectively without having to explicitly write out the contents of their GraphQL query.

From now on, we'll start working on our little app over on the right hand side of the screen.

So this time, instead of modifying this \`Step10.jsx\` component, find the \`MoviesList\` component in \`lib/components/movies/MoviesList.jsx\` and uncomment the \`useMulti2\` group of lines. 
`;

const after = `
Wow, look at that! The \`useMulti2\` hook did its job and loaded a list of movies for us. And all we had to do was to pass it a \`collection\` option to indicate where to load data from.

By the way, in case you're wondering the \`2\` in \`useMulti2\` and \`useSingle2\` are a temporary backwards-compatibility measure to indicate that these hooks use the newer version of Vulcan's own internal API. 
`;

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [{file: '/lib/components/movies/MoviesList.jsx', string: 'const useMulti2Object = useMulti2'}];

export default Step;
