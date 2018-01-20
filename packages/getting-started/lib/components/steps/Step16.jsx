import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const text = `
## Datatables

Learning about collections and schemas, seeding data, loading it on the client, inserting new documents… we've come a long way since step 1. 

And now that we've learned about so many concepts, let's take a look at a core component that brings them all together, the mighty [Datatable](http://docs.vulcanjs.org/core-components.html#Datatable). 

Datatables are a super-quick way to load and display a bunch of data, without having to worry about HoCs or components. Just specify a few options and you're good to go!

Find \`Step16.jsx\` and add the following code:

~~~
<Components.Datatable 
  collection={Movies} 
  columns={['name', 'review']} 
/>
~~~
`;

const after = `
As an extra feature, the \`Datatable\` component also includes a search function. To make a field searchable, just add the \`searchable: true\` property to its schema. Try it now with the \`name\` and \`review\` fields!
`;

const Step16 = () => (
  <Components.Step step={16} text={text} after={after}>
    <Components.Datatable 
      collection={Movies} 
      columns={['name', 'review']} 
    />
  </Components.Step>
);

registerComponent('Step16', Step16);