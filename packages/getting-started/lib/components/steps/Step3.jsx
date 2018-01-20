import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const text = `
## Importing Components

Registering a component tells Vulcan about it, but it's also important to make sure our component is properly *imported*, otherwise that registration function will never be executed in the first place!

It turns out that's just what happened with \`Step4.jsx\`: the component is registered just fine, but the component's *file* itself is not being imported anywhere in the rest of our codebase. Let's fix this by going into \`lib/modules/components.js\` and uncommenting the \`Step4\` import. 

Once we've done this, we can now go ahead and write the route for step 4, following the same model as previous steps. 
`;

const Step3 = () => <Components.Step step={3} text={text} />;

// registerComponent('Step3', Step3); // <- uncomment me!
