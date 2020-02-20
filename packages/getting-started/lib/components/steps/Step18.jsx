import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Sorting & Filtering

const text = [`
By default, our movies data will be unsorted. But what if we wanted to sort our list of movies alphabetically instead? Or generally have more control over what data we show? We can do all of this using [filtering and ordering](http://docs.vulcanjs.org/filtering.html). 

First, we'll use the \`defaultInput\` collection option to provide default sorting options for the \`Movies\` collection. These will then be used whenever no other sorting options are explicitly provided. In  \'lib/modules/collection.js\', uncomment the \`defaultInput: { sort: { createdAt: 'desc' } }\` line.
`];

const after = `
Nice! If we've done our job correctly, you can add a new movie and it should now appear in top position. 

Now let's look at controlling ordering for a *specific* list of items. In \`MoviesApp2\`, uncomment the \`options={{ input: { sort: { name: 'asc' } } }}\` line. 

The datatable's \`options\` prop is being passed on to the \`multi\` query responsible for loading its data. And that \`input\` is the query's single argument, used to control what dataset the server returns. All this means that once you uncomment that line, our list of movies should no longer be sorted in reverse chronological order, but in alphabetical order instead.

If you'd like, you can also try **filtering** the list. Replace the \`options\` line by \`options={{ input: { filter: { name: { _in: ['Die Hard', 'Die Hard III'] } } } }}\` and see what happens! Just don't forget to change it back after.

Once you get all this working, feel free to move on to the next step.
`;

const Step18 = () => (
  <Components.Step step={18} text={text} after={after}/>
);

registerComponent({ name: 'Step18', component: Step18 });