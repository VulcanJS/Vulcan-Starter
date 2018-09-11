import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Internationalization

const text = [`
We're almost there. Let's take a look at one more aspect of Vulcan: [internationalization](http://docs.vulcanjs.org/internationalization.html). The cool part is that you can use it not only to translate your app or make it available in multiple languages, but also to change any text string in Vulcan!

For example, maybe we want to change that “New” button text in the Datatable to “New Movie”. 

That specific string is registered under the id \`datatable.new\`, so replacing it is just a matter of adding the following code snippet, which you'll find in \`lib/modules/i18n.js\`:
`,`
~~~js
import { addStrings } from 'meteor/vulcan:core';

addStrings('en', {
  'datatable.new': 'New Movie',
});
~~~
`];

const after = `
Congrats, you're almost to the end of the tutorial!
`;

const Step19 = () => (
  <Components.Step step={19} text={text} after={after}/>
);

registerComponent({ name: 'Step19', component: Step19 });