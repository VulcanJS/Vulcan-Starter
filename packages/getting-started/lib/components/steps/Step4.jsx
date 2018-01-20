import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const text = `
## Core Components

Nice job! By the way, don't worry: from now on, all components will be already registered and imported, and all routes already created for you so you don't need to repeat the same tasks. 

Now let's play around with some of Vulcan's premade [core components](http://docs.vulcanjs.org/theming.html#Core-Components), such as [the \`ModalTrigger\` component](http://docs.vulcanjs.org/theming.html#ModalTrigger), which lets you show info inside a modal window. 

Find the file for the step 4 component (in other words, the one you're looking at right now!) at \`lib/components/steps/Step4.jsx\` and uncomment the middle part (in other words, remove \`{/*\` and \`*/}\`). 

Note that in Vulcan, any registered component can be accessed as \`<Components.ComponentName/>\`. This can include core components, components that are part of a theme or plug-in, as well as components you created yourself.
`;

const Step4 = () => (
  <Components.Step step={4} text={text}>
    {/*
    <Components.ModalTrigger component={<a href="#">Click Me!</a>}>
      <div>Hello World!</div>
    </Components.ModalTrigger>
    */}
  </Components.Step>
);

registerComponent('Step4', Step4);
