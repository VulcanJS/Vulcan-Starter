import React from 'react';
import { Collections } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

// Collections

const text = [
  `
By itself, a schema doesn't do much. We need to [create a **collection**](http://docs.vulcanjs.org/schemas.html#Creating-Collections) to actually make use of it. 

At a minimum, a collection needs two things:

- A \`typeName\`, which will be the name of an individual document in the collection (in this case, a \`Movie\`).
- A \`schema\`. 

Which put together gives us the following code: 
`,
  `
~~~js
const Movies = createCollection({
  typeName: 'Movie',
  schema
});
~~~
`,
  `
Find the \`lib/modules/collection.js\` file and uncomment the \`createCollection\` definition. Once you do, your collection should appear in the list below:
`,
];

const after = `
Yep, there it is!

As you can see, out of the box Vulcan already includes a \`Users\` collection, used to store users and manage accounts, as well as \`Settings\` and \`Callbacks\` collections used locally for debugging purposes. 
`;

const Step = () => (
  <StepWrapper
    title={Step.title}
    text={text}
    after={after}
    check={() => {
      return Collections.find((c) => c.options.collectionName === 'Movies');
    }}
  >
    <ul>
      {Collections.filter((c) => !['Settings', 'Callbacks'].includes(c.options.collectionName)).map((c, i) => (
        <li key={i}>
          <code>{c.options.collectionName}</code>
        </li>
      ))}
    </ul>
  </StepWrapper>
);

Step.title = 'Collections';

export default Step;
