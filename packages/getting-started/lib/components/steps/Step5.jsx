import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const text = `
## Schemas

Now that you have an idea of Vulcan's basic features, let's dive into what *really* makes Vulcan special: how it handles **data**. 

In Vulcan, each type of data belongs to its own **collection** (or **model** if you're more familiar with that term). So you could have a \`Posts\` collection, a \`Comments\` collection, a \`Movies\` collection, and so on. 

And each collection features a [schema](http://docs.vulcanjs.org/schemas.html) that defines what a post, comment, or movie should look like (in other words, what fields it should have).

This package already includes a pre-written schema. Just find this component (\`Step5.jsx\`) and uncomment the \`<Components.Schema/>\` component to see it. 
`;

const after = `
Before we go to the next step, let's take a second to look at this schema. As you can see, we're defining four fields: \`_id\`, \`userId\`, \`name\`, and \`review\`, which together make up the schema for our upcoming \`Movies\` collection. 

Also of note are the \`viewableBy\`, \`insertableBy\`, and \`editableBy\` properties that specify which user groups can view, insert, or edit each field. Out of the box, Vulcan has three predefined groups:

- \`guests\`: any user without an account.
- \`members\`: any user *with* an account.
- \`admins\`: users with special privileges. 

Note that the first account you create in any Vulcan app automatically belongs to the \`admins\` group. But more on that later. For now, onwards to the next step!
`

const Step5 = () => (
  <Components.Step step={5} text={text} after={after}>
    <Components.Schema/>
  </Components.Step>
);

registerComponent('Step5', Step5);
