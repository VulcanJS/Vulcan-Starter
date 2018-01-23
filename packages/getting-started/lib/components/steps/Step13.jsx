import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

const text = `
## User Accounts

The vast majority of apps all need some kind of user accounts management in order to be functional. 

Vulcan makes this drop-dead easy. Find \`MoviesList\` again and uncomment the \`Components.AccountsLoginForm\` line.

Next, go ahead and use the form to sign up in order to get your very own user account. 
`;

const after = `
That wasn't too bad!

Note that since this was the first user account created, Vulcan automatically assigned it admin privileges. 
`;

const Step13 = ({ currentUser }) => (
  <Components.Step step={13} text={text} after={after} />
);

registerComponent('Step13', Step13);