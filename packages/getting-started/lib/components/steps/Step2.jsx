import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Registering Components

const text = `
You've just created your first route. Now let's do it again for the Step 3 route. Go back to the routes file, and uncomment it. Take a moment to look at its properties:

- \`name\`: \`step3\`
- \`path\`: \`/step/3\`
- \`componentName\`: \`Step3\`

As an added task, we'll also [register the component](http://docs.vulcanjs.org/theming.html#Registering-Components) for step 3, which you can find in \`lib/components/steps/Step3.jsx\`. 

Just uncomment that last \`registerComponent\` line. This will register the component with Vulcan, and make it available to use inside \`addRoute\`. 
`;

const after = `
Nicely done. In Vulcan, components are available globally as \`<Components.Foobar/>\` once registered. 

You can review them all by accessing the [Components dashboard](/components) (note that most of the components you'll see in there belong to various Vulcan packages, such as \`vulcan:core\`, \`vulcan:forms\`, etc.).
`;

const Step2 = () => <Components.Step step={2} text={text} after={after} />;

registerComponent('Step2', Step2);
