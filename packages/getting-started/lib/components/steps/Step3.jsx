import React from 'react';
import StepWrapper from './StepWrapper.jsx';
import Schema from '../other/Schema.jsx';

export const title = 'Schemas';

const text = `
Now that you have an idea of Vulcan's basic features, let's dive into what *really* makes Vulcan special: how it handles **data**. 

In Vulcan, each type of data belongs to its own **collection** (or **model** if you're more familiar with that term). So you could have a \`Posts\` collection, a \`Comments\` collection, a \`Movies\` collection, and so on. And each item of a collection has an associated **type**, such as a \`Post\`, \`Comment\`, or \`Movie\`.

Each collection features a [schema](http://docs.vulcanjs.org/schemas.html) that defines what a post, comment, or movie should look like (in other words, what fields it should have).

This package already includes a pre-written schema for a \`Movies\` collection. Just find this component (\`Step3.jsx\`) and uncomment the \`Schema\` component to display its contents below: 
`;

const after = `
Before we go to the next step, let's take a second to look at this schema. As you can see, we're defining five fields: \`_id\`, \`createdAt\`, \`userId\`, \`name\`, and \`review\`, which together make up the schema for our upcoming \`Movies\` collection. 

Note that \`createdAt\` has an \`onCreate\` property, which returns a callback that will set it to the current timestamp whenever a new document is inserted. 

Also of note are the \`canRead\`, \`canCreate\`, and \`canUpdate\` properties that specify which user groups can view, insert, or edit each field. Out of the box, Vulcan has four predefined groups:

- \`guests\`: any user without an account.
- \`members\`: any user *with* an account.
- \`owners\`: any user that “owns” the document being operated on (more on that later).
- \`admins\`: users with special admin privileges. 

A field will only appear in your GraphQL schema if it has at least one of those three special properties. In other words, Vulcan will not expose any of your data unless you explicitly tell it to.

Note that the first account you create in any Vulcan app automatically belongs to the \`admins\` group. But more on that later. For now, onwards to the next step!
`;

// uncomment the component's child on #Step3:

const Step = () => (
  <StepWrapper title={Step.title} text={text} after={after}>
    {/* <Schema/> */}
  </StepWrapper>
);

export const checks = [{ string: '<Schema/>' }];

export default Step;
