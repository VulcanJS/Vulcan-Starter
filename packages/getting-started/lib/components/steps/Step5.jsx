import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Schemas

const text = `
Now that you have an idea of Vulcan's basic features, let's dive into what *really* makes Vulcan special: how it handles **data**. 

In Vulcan, each type of data belongs to its own **collection** (or **model** if you're more familiar with that term). So you could have a \`Posts\` collection, a \`Comments\` collection, a \`Movies\` collection, and so on. 

And each collection features a [schema](http://docs.vulcanjs.org/schemas.html) that defines what a post, comment, or movie should look like (in other words, what fields it should have).

This package already includes a pre-written schema for a \`Movies\` collection. Just find this component (\`Step5.jsx\`) and uncomment the \`<Components.Schema/>\` component to display its contents below: 
`;

const after = `
Before we go to the next step, let's take a second to look at this schema. As you can see, we're defining five fields: \`_id\`, \`createdAt\`, \`userId\`, \`name\`, and \`review\`, which together make up the schema for our upcoming \`Movies\` collection. 

Note that \`createdAt\` has an \`onCreate\` property, which returns a callback that will set it to the current timestamp whenever a new document is inserted. 

Also of note are the \`canRead\`, \`canCreate\`, and \`canUpdate\` properties that specify which user groups can view, insert, or edit each field. Out of the box, Vulcan has three predefined groups:

- \`guests\`: any user without an account.
- \`members\`: any user *with* an account.
- \`admins\`: users with special privileges. 

A field will only appear in your GraphQL schema if it has at least one of those three special properties. In other words, Vulcan will not expose any of your data unless you explicitly tell it to.

Note that the first account you create in any Vulcan app automatically belongs to the \`admins\` group. But more on that later. For now, onwards to the next step!
`

// uncomment the component's children on #Step5:

const Step5 = () => (
  <Components.Step step={5} text={text} after={after}>
    
    <Components.Schema/>
   
  </Components.Step>
);

registerComponent({ name: 'Step5', component: Step5 });
