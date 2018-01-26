
import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Uncomment children on #Step13:
const MoviesUsers = () => (
  <div className="movies-users">
    <Components.AccountsLoginForm redirect={false} /> 
  </div>
);

registerComponent('MoviesUsers', MoviesUsers);
