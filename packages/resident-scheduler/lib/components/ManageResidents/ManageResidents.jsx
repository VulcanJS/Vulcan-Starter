import React, { useState } from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent,
  withAccess
} from "meteor/vulcan:core";

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from "prop-types";
import { adminAccessOptions } from "../SchedulerFunctions/SchedulerFunctions.jsx";

const ManageResidents = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms
}) => {
  const [currentResident, setCurrentResident] = useState('')
  const setActiveResident = (event) => setCurrentResident(event.target.value)
  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Components.SchedulerHeader />
      <h4> Select Resident </h4>
      <Components.SelectResident onChange={setActiveResident} />
      {console.log("****Active Residents***")}
      {console.log(currentResident)}
      {currentResident.length > 0 && (
        <Components.UpdateResidents
          currentUser={currentUser}
          terms={{ resident: currentResident }}
          currentResident={currentResident}
        />
      )}
    </div>
  );
};

ManageResidents.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

const options = {
  collection: Schedules,
  limit: 7
};

registerComponent({
  name: "ManageResidents",
  component: ManageResidents,
  hocs: [
    withCurrentUser,
    [withAccess, adminAccessOptions],
    [withMulti, options]
  ]
});
