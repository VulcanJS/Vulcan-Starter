import React from 'react';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Internationalization';

const text = [
  `
We're almost there. Let's take a look at one more aspect of Vulcan: [internationalization](http://docs.vulcanjs.org/internationalization.html). The cool part is that you can use it not only to translate your app or make it available in multiple languages, but also to change any text string in Vulcan!

For example, maybe we want to change that “New” button text in the Datatable to “New Movie”. 

That specific string is registered under the id \`datatable.new\`, so replacing it is just a matter of adding the following code snippet, which you'll find in \`lib/modules/i18n.js\`:
`,
  `
~~~js
import { addStrings } from 'meteor/vulcan:core';

addStrings('en', {
  'datatable.new': 'New Movie',
});
~~~
`,
  `
Also, a whole other aspect of Vulcan's internationalization support is the ability to have multiple versions of your **content**, too. Let's give this a quick try before we move on.

In \`lib/modules/schema.js\`, uncomment \`intl: true\` in the \`name\` field definition. This will enable internationalization for this field. Because we've already registered English and French as our app's two locales in \`lib/modules/i18n.js\`, our field will now offer both languages in the “Edit” form. 
`,
];

const after = `
Of course, Vulcan also offers ways of detecting the user's locale or manually changing it on the fly to display the correct language, but that's a matter for another day.  

Congrats, you're almost at the end of the tutorial!
`;

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [
  { file: '/lib/modules/i18n.js', string: 'addStrings' },
  { file: '/lib/modules/schema.js', string: 'intl: true' },
];

export default Step;
