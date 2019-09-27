import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Importing Components

const text = `
Registering a component tells Vulcan about it, but it's also important to make sure our component is properly *imported*, otherwise that registration function will never be executed in the first place!

It turns out that's just what happened with \`Step4.jsx\`: the component is registered just fine, but the component's *file* itself is not being imported anywhere in the rest of our codebase. Let's fix this by going into \`lib/modules/components.js\` and uncommenting the \`Step4\` import. 

Once we've done this, we can now go ahead and uncomment the **route** for step 4, following the same pattern as in previous steps. 
`;

const after = `
It's easy to forget to import a file. A good pattern is to have a central \`components.js\` file that imports all of your app's components.

Now let's learn a couple more Vulcan basics before we start building our little app. 
`;

const Step3 = () => <Components.Step step={3} text={text} after={after}/>;

registerComponent({ name: 'Step3', component: Step3 }); // uncomment on #Step2