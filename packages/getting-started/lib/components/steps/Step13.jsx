import React from 'react';
import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const text = `
## User Accounts

The vast majority of apps all need some kind of user accounts management in order to be functional. 

Vulcan makes this drop-dead easy. Find \`Step13.jsx\` and uncomment the \`Components.AccountsLoginForm\` line.

Next, go ahead and use the form to sign up in order to get your very own user account. 
`;

const after = `
That wasn't too bad!

Note that since this was the first user account created, Vulcan automatically assigned it admin privileges. 
`;

const Step13 = ({ currentUser }) => (
  <Components.Step step={13} text={text} after={after} currentUser={currentUser}>
    <Components.AccountsLoginForm redirect={false}/>
  </Components.Step>
);

const options = {
  collection: Movies,
  fragmentName: 'MoviesFragment'
}

registerComponent('Step13', Step13, withCurrentUser);