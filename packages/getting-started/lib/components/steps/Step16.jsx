import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

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

Also, as an extra feature, the \`Datatable\` component also includes a search function. To make a field searchable, just add the \`searchable: true\` property to it in \`lib/modules/schema.js\`. Try it now with the \`name\` and \`review\` fields!
`;

const Step16 = () => (
  <Components.Step step={16} text={text} after={after}/>
);

registerComponent('Step16', Step16);