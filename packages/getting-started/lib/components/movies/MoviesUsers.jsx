
import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

// Uncomment contents on #Step13:
const MoviesUsers = ({ currentUser }) => (
  <div className="movies-users">
    {/* 
    {currentUser} && <p>Welcome, {currentUser.displayName} {currentUser.isAdmin && `(admin)`}</p>}
    <Components.AccountsLoginForm redirect={false} /> 
    */}
  </div>
);

registerComponent('MoviesUsers', MoviesUsers, withCurrentUser);
