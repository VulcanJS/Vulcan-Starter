import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Sorting

const text = [`
By default, data is sorted according to its \`createdAt\` timestamp in descending order (meaning more recent items appear at the top of the list).

But what if we wanted to sort our list of movies alphabetically instead? We can do this using [views](http://docs.vulcanjs.org/terms-parameters.html#Using-Views). A view is just an easy way to group a set of sorting and filtering parameters. It's also handy because it means you can hardcode the exact set of options the server will support, instead of just accepting any random property from the client and opening yourself to security risks. 

The first step towards enabling our view is to tell our Datatable to use it. In \`MoviesApp2\`, uncomment the \`options={{ terms: { view: 'alphabetical' } }}\` line. 

Now let's take care of the view itself. Uncomment the following code in \`lib/modules/views.js\`:
`,`
~~~js
Movies.addView('alphabetical', terms => ({
  options: {
    sort: {name: 1}
  }
}));
~~~
`];

const after = `
If we've done our job correctly, *Citizen Kane* should now be in top position. 

Let's take a look at our code. The \`addView\` function takes two arguments: first, the name of the view (which we'll use to reference it), and second a function that takes a set of \`terms\` and returns a \`parameters\` object. 

\`terms\` is one of the arguments of the GraphQL query used to fetch our data, and as such will be passed to the List resolver, and from there fed to our view function. 

Our view function's job is then to output a \`parameters\` object that can be used as a MongoDB specifier. You can now see why it's so important to have the view act as an intermediary between the client and our database!
`;

const Step18 = () => (
  <Components.Step step={18} text={text} after={after}/>
);

registerComponent({ name: 'Step18', component: Step18 });