/* 

Pics Home component

*/

import React from 'react';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const PicsHome = ({results = [], currentUser, loading, loadMore, count, totalCount}) => {
  if (currentUser) {

    return (
      <div className="pics-list">

        {Users.canDo(currentUser, 'pics.view') ?

          <Components.PicsList /> :
        
          <Components.Checkout
            productKey="membership"
            associatedCollection={Users}
            associatedDocument={currentUser}
            fragmentName="UsersCurrent"
            button={<Components.Button variant="primary">Buy membership</Components.Button>}
          />
        
        }

      </div>
    )

  } else {

    return (
      <div className="pics-list">
        <p>Please sign up or log in to access this content</p>
      </div>
    )

  }
  
};

registerComponent({ name: 'PicsHome', component: PicsHome, hocs: [withCurrentUser] });
