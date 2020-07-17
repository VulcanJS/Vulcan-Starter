import React from 'react';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Datatables';

const text = [
  `
Learning about collections and schemas, seeding data, loading it on the client, inserting new documents… we've come a long way since step 1. 

And now that we've learned about so many concepts, let's take a look at a core component that brings them all together, the mighty [Datatable](http://docs.vulcanjs.org/datatable.html). 

Datatables are a super-quick way to load and display a bunch of data, without having to worry about hooks or components. Just specify a few options and you're good to go!

For example, here's how you'd display a basic Datatable for the \`Movies\` collection:
`,
  `
~~~js
<Components.Datatable collection={Movies} />
~~~
`,
  `
We already have a Datatable ready to go in a \`MoviesApp2\` component, which we'll use to [replace](http://docs.vulcanjs.org/components.html#Replacing-Components) the existing \`MoviesApp\` component.

To do so find \`lib/components/other/Layout.jsx\` and replace \`<MoviesApp/>\` with \`<MoviesApp2/>\`.

`,
];

const after = `
Did you see the \`review\` field is back? That's because we're not using our fragment to load data anymore, instead the Datatable is doing its best to “guess” the appropriate list of fields. That being said, just like with forms if you want to be safe then manually specifying fragments is always a good idea.

Also, as an extra feature, the \`Datatable\` component also includes a search function. The \`name\` and \`review\` fields happen to have the \`searchable: true\` property in our schema, which makes them searchable. Type in “classic” to try it now!

By the way, this is out first time looking at the \`Layout\` component. This is a special default layout component included in every Vulcan app that automatically wraps all your other components. Here, we are *replacing* this default layout with our own three-column component that contains our table of contents, main content area, and Movies app. 

Using \`replaceComponent\` lets us replace and customize any of Vulcan's internal components in this way, from layouts to forms to datatables.
`;

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [{ file: '/lib/components/other/Layout.jsx', string: '<MoviesApp2 />' }];

export default Step;
