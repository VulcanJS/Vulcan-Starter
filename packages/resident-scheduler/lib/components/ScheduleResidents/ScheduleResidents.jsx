import React, { useState } from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent,
  withAccess
} from "meteor/vulcan:core";
import { withRouter } from 'react-router';

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from "prop-types";
import { adminAccessOptions } from "../SchedulerFunctions/SchedulerFunctions.jsx";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

const ScheduleResidents = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  match
}) => {
  console.log('****ROUTER****')
  console.log(match)
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
        <Components.ScheduleList
          currentUser={currentUser}
          terms={{ resident: currentResident }}
          currentResident={currentResident}
        />
      )}
    </div>
  );
};

ScheduleResidents.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

const options = {
  collection: Schedules,
  limit: 7
};

registerComponent({
  name: "ScheduleResidents",
  component: ScheduleResidents,
  hocs: [
    withCurrentUser,
    [withAccess, adminAccessOptions],
    [withMulti, options],
    withRouter,
  ]
});
