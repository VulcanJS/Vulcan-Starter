import React from 'react';
import { Components, registerComponent, Collections } from 'meteor/vulcan:core';

// Collections

const text = [`
By itself, a schema doesn't do much. We need to [create a **collection**](http://docs.vulcanjs.org/schemas.html#Creating-Collections) to actually make use of it. 

At a minimum, a collection needs two things:

- A \`typeName\`, which will be the name of an individual document in the collection (in this case, a \`Movie\`).
- A \`schema\`. 

Which put together gives us the following code: 
`,`
~~~js
const Movies = createCollection({
  typeName: 'Movie',
  schema
});
~~~
`,`
Find the \`lib/modules/collection.js\` file and uncomment the \`createCollection\` definition (don't worry about \`resolvers\` and \`mutations\` for now, that will come later).

Once you do, your collection should appear in the list below:
`];

const after = `
Yep, there it is!

As you can see, out of the box Vulcan already includes a \`Users\` collection, used to store users and manage accounts, as well as \`Settings\` and \`Callbacks\` collections used locally for debugging purposes. 
`;

const Step6 = () => (
  <Components.Step step={6} text={text} after={after}>
    <ul>
      {Collections.map((c, i) => <li key={i}><code>{c.options.collectionName}</code></li>)}
    </ul>
  </Components.Step>
);

registerComponent({ name: 'Step6', component: Step6 });
