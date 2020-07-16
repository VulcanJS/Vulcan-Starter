import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';

// Uncomment Components.AccountsLoginForm on #Step12:
const MoviesUsers = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="movies-users">
      <div>
        {currentUser && (
          <p>
            Welcome, {currentUser.displayName} {currentUser.isAdmin && `(admin)`}
          </p>
        )}
        {/* <Components.AccountsLoginForm redirect={false} /> */}
      </div>
    </div>
  );
};

export default MoviesUsers;
