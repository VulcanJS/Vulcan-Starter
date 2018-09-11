import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Permissions

const text = `
If you're logged in and your account has the proper admin privileges, you should see Edit buttons next to every item in the Datatable. That's by design: in Vulcan, admin accounts automatically pass every permission checks. 

But in a real world app, you'll probably want to handle regular users as well. So let's see how we can assign [permissions](http://docs.vulcanjs.org/groups-permissions.html) to let users edit their own movies. 

Start by signing out and creating a new account, which this time *won't* be an Admin account. Notice the new and edit buttons disappeared? That's because we've yet to tell our back-end who can insert and edit movies. 

Find \`lib/modules/permissions.js\` and uncomment its contents.`;

const after = [`
The “New” button should be back, so try creating a new movie. Not only should it appear at the top of the list, but it should also have an “Edit” button attached. 

So how does this work? We are using the default mutations, which by convention check for the presence of actions named \`***.new\`, \`***.edit.own\`, and \`***.remove.own\` (where \`***\` is replaced with the lowercase name of the collection, in this case \`movies\`).

Now let's review the code we added:
`,`
~~~js
const membersActions = [
  'movie.create',
  'movie.update.own',
  'movie.delete.own',
];
Users.groups.members.can(membersActions);
~~~
`,`
We've declared that any user belonging to the \`members\` group (which is a preset that corresponds to any logged-in user) is allowed to perform these three actions.

And in case you're wondering how Vulcan knows whether a user owns a document or not, behind the scenes we simply check if the document's \`userId\` property is equal to the user's own \`_id\`.
`];

const Step17 = () => (
  <Components.Step step={17} text={text} after={after}/>
);

registerComponent({ name: 'Step17', component: Step17 });