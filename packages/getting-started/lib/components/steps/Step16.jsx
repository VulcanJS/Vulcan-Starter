import React from 'react';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Permissions';

const text = `
If you're logged in and your account has the proper admin privileges, you should see Edit buttons next to every item in the Datatable. That's by design: in Vulcan, admin accounts automatically pass every permission checks. 

But in a real world app, you'll probably want to handle regular users as well. So let's see how we can assign [permissions](http://docs.vulcanjs.org/groups-permissions.html) to let users edit their own movies. 

Start by signing out and creating a new account, which this time *won't* be an Admin account. Notice the new and edit buttons disappeared? That's because we've yet to tell our back-end who can insert and edit movies. 

Find \`lib/modules/collection.js\` and uncomment the \`permissions\` property.`;

const after = [
  `
The “New” button should be back, so try creating a new movie. Not only should it appear at the top of the list, but it should also have an “Edit” button attached. 

So how does this work? Let's review the permissions code we added:
`,
  `
~~~js
{
  canRead: ['guests'],
  canCreate: ['members'],
  canUpdate: ['owners'],
  canDelete: ['owners'],
}
~~~
`,
  `

First, we've declared that any user belonging to the \`guests\` group (in other words anybody accessing our API, even without being authentified) can read (i.e. access) a movie document. This is actually the default for any new collection, so specifying \`canRead\` is not strictly necessary unless you do want to restrict documents to specific groups. 

Then, we declare that any \`members\` (in other words any user, as long as they are logged in) can create a new movie. 

Finally, for Update and Delete operations, we check if a user belongs to the \`owners\` group, in other words whether the modified document's \`userId\` property is equal to the user's own \`_id\`.

You can consider these three default groups (along with the \`admins\` group) like shortcuts to common user roles. But you can also create your own custom groups, or even provide your own permission checks that bypass groups altogether. 
`,
];

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [{ file: '/lib/modules/collection.js', string: 'permissions' }];

export default Step;
