import React from 'react';
import { Components } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Core Components';

const text = `
Now let's play around with some of Vulcan's premade [core components](http://docs.vulcanjs.org/ui-components.html), such as [the \`ModalTrigger\` component](http://docs.vulcanjs.org/ui-components.html#ModalTrigger), which lets you show info inside a modal window. 

Find the file for the step 4 component at \`lib/components/steps/Step4.jsx\` and uncomment the middle part (in other words, remove \`{/*\` and \`*/}\`). The results will appear below.
`;

const after = `
The \`ModalTrigger\` component takes a component or HTML snippet as \`component\` prop to serve as the trigger for the modal popup, and displays its children as the modal's contents. Try clicking that link!

In Vulcan any registered component can be accessed as \`<Components.ComponentName/>\`. This can include core components, components that are part of a theme or plug-in, as well as components you created yourself.
`;

// uncomment the component's children on #Step4:

const Step = () => (
  <StepWrapper title={Step.title} text={text} after={after} check={({ children }) => !!children}>
    {/*     
    <Components.ModalTrigger component={<a href="#">Click Me!</a>}>
      <div>Hello World!</div>
    </Components.ModalTrigger> 
    */}
  </StepWrapper>
);

export const checks = [{ string: '<Components.ModalTrigger component={<a href="#">Click Me!</a>}>'}];

export default Step;
