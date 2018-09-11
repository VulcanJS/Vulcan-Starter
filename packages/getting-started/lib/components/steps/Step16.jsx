import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Datatables

const text = [`
Learning about collections and schemas, seeding data, loading it on the client, inserting new documents… we've come a long way since step 1. 

And now that we've learned about so many concepts, let's take a look at a core component that brings them all together, the mighty [Datatable](http://docs.vulcanjs.org/core-components.html#Datatable). 

Datatables are a super-quick way to load and display a bunch of data, without having to worry about HoCs or components. Just specify a few options and you're good to go!

For example, here's how you'd display a Datatable for the \`Movies\` collection, featuring the \`name\` and \`review\` columns (note that you do need to manually specify a list of columns so that the datatable knows what fields to ask for).
`,`
~~~js
<Components.Datatable 
  collection={Movies} 
  columns={['name', 'review']}
/>
~~~
`,`
We already have a Datatable ready to go in a \`MoviesApp2\` component, which we'll use to [replace](http://docs.vulcanjs.org/theming.html#Replacing-Components) the existing \`MoviesApp\` component.

To do so find \`lib/modules/components.js\` and uncomment the \`MoviesApp2\` import.

`];

const after = `
If you take a closer look at \`MoviesApp2.jsx\`, you'll notice that it uses \`replaceComponent\` to *replace* the existing \`MoviesApp\` component. This explains why our new Datatable-enabled version just pops in at the same spot. This can be very useful when you want to surgically modify a specific component of a theme or package without having to fork its entire codebase. Every component is replaceable in Vulcan, including the parts that make up Datatable itself!

By the way, did you see the \`review\` field is back? That's because we're not using our fragment to load data anymore, instead the Datatable is doing its best to “guess” the appropriate list of fields. That being said, if you want to be safe then manually specifying a fragment is always a good idea.

Also, as an extra feature, the \`Datatable\` component also includes a search function. The \`name\` and \`review\` fields happen to have the \`searchable: true\` property in our schema, which makes them searchable. Try it now!
`;

const Step16 = () => (
  <Components.Step step={16} text={text} after={after}/>
);

registerComponent({ name: 'Step16', component: Step16 });