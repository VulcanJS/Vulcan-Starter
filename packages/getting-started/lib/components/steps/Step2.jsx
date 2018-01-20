import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const text = `
## Registering a Component

Well done! You've just created your first route. Now let's do it again for step 3, but this time we'll write it from scratch. Go back to the routes file, and create a new route with the following parameters:

- \`name\`: \`step3\`
- \`path\`: \`/step/3\`
- \`componentName\`: \`Step3\`

As an added task, we'll also [register the component](http://docs.vulcanjs.org/theming.html#Registering-Components) for step 3, which you can find in \`lib/components/steps/Step3.jsx\`. 

Just uncomment that last \`registerComponent\` line. This will register the component with Vulcan, and make it available to use inside \`addRoute\`. 
`;

const Step2 = () => <Components.Step step={2} text={text} />;

registerComponent('Step2', Step2);
