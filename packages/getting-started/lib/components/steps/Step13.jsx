import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

const text = `
## User Accounts

The vast majority of apps all need some kind of user accounts management in order to be functional. 

Vulcan makes this drop-dead easy. Find \`MoviesUsers.jsx\` in the same directory as \`MoviesList.jsx\` and uncomment the \`Components.AccountsLoginForm\` line.

Next, go ahead and use the form to sign up in order to get your very own user account. 
`;

const after = `
That wasn't too bad!

Note that if this was the first user account you created inside this project (including other examples), Vulcan will have automatically assigned it admin privileges. 
`;

const Step13 = ({ currentUser }) => (
  <Components.Step step={13} text={text} after={after} currentUser={currentUser}/>
);

registerComponent('Step13', Step13, withCurrentUser);