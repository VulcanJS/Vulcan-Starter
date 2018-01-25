import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const text = `
Before we can move on to the next step, we need to create a **route** for it. 

In Vulcan, routes are created using the [addRoute](http://docs.vulcanjs.org/routing.html#Adding-Routes) function. 

Let's create a route for step 2. Open \`/lib/modules/routes.js\`, find the route named \`step2\`, and uncomment that line. Once you save the file, this page should automatically reload. 

You'll notice that the route points to a component named \`Step2\`, which we've already registetered. But more on that very soon!
`;

const after = `
Well done, you've beaten level 1!
`;

const Step1 = () => <Components.Step step={1} text={text} after={after}/>;

registerComponent('Step1', Step1);
