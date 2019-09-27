/* 

components/MoviesList.jsx #tutorial-step-7 - 
The component for our list of movies, which we called in to modules/routes.js.

Wrapped with the "withList" and "withCurrentUser" containers.

#tutorial-step-11 -
Now, we are going to look at this in a bit more detail.
This component is a React component. We only have one but it does a bunch of things... 
*/

import React from "react";
import {
  Components,
  withCurrentUser,
  registerComponent,
} from "meteor/vulcan:core";
import Users from 'meteor/vulcan:users';

import Schedules from "../../modules/schedules/collection.js";

const MainPage = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms
}) => {
  console.log(currentUser)
  //Users.update(currentUser._id, {$push: {groups: 'members'}});
  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
     {!currentUser ? <Components.Header /> 
     :
      loading ? (
        <Components.Loading />
      ) : (
        <div className="schedules">
          {true ? (
            <div
              style={{  
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #ccc"
              }}
            >
              {currentUser.isAdmin ? <Components.SchedulerHeader /> : <Components.ResidentHeader /> }
            </div>
          ) : <div>Failed for {currentUser.username} </div>}
        </div>
      )}
    </div>
  );
};

registerComponent({
  name: "MainPage",
  component: MainPage,
  hocs: [withCurrentUser]
});