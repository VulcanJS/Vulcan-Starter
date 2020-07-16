import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Sorting & Filtering';

const text = [
  `
By default, our movies data will be sorted in descending chronological order. But what if we wanted to sort our list of movies alphabetically instead? Or generally have more control over what data we show? We can do all of this using [filtering and ordering](http://docs.vulcanjs.org/filtering.html). 


Now let's look at controlling ordering for a *specific* list of items. In \`MoviesApp2\`, uncomment the \`options={{ input: { sort: { name: 'asc' } } }}\` line. 

The datatable's \`options\` prop is being passed on to the \`multi2\` query responsible for loading its data. And that \`input\` is the query's single argument, used to control what dataset the server returns. All this means that once you uncomment that line, our list of movies should no longer be sorted in reverse chronological order, but in alphabetical order instead.
`,
];

const after = `
If you'd like, you can also try **filtering** the list. Replace the \`options\` line by \`options={{ input: { filter: { name: { _in: ['Die Hard', 'Star Wars'] } } } }}\` and see what happens! Just don't forget to change it back after.

Once you get all this working, feel free to move on to the next step.
`;

// TODO check

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [
  { file: '/lib/components/movies/MoviesApp2.jsx', string: `options={{ input: { sort: { name: 'asc' } } }}` },
];

export default Step;
