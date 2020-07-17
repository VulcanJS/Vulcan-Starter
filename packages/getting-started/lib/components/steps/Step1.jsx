import React from 'react';
import { Routes } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Creating Routes';

const text = `
Before we can move on to the next step, we need to create a **route** for it. 

In Vulcan, routes are created using the [addRoute](http://docs.vulcanjs.org/routing.html#Adding-Routes) function. 

Let's create a route for step 2. Open \`/lib/modules/routes.js\`, find the route named \`step2\`, and uncomment that line. Once you save the file, this page should automatically reload. 
`;

const after = `
Well done, you've beaten level 1! Don't worry, things will get harder from now on… (but not *too* hard!).
`;

const Step = () => (
  <StepWrapper
    title={Step.title}
    text={text}
    after={after}
    check={() => {
      return !!Routes.step2;
    }}
  />
);

export const checks = [
  { file: '/lib/modules/routes.js', string: `addRoute({ name: 'step2', path: '/step/2', component: Step2 })` },
];

export default Step;
