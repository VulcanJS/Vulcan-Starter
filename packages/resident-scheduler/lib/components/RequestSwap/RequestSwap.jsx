

import React from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent,
  withAccess
} from "meteor/vulcan:core";

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from 'prop-types';
import { adminAccessOptions } from "../SchedulerFunctions/SchedulerFunctions.jsx";
import { memberAccessOptions } from "../AcceptSchedule/AcceptSchedule.jsx";

const RequestSwap = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  currentResident,
}) => {
  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Components.ResidentHeader />
      <div>RequestSwap PlaceHolder</div>
    </div>
  );
};

RequestSwap.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object,
};

const options = {
  collection: Schedules,
  limit: 7
};

registerComponent({
  name: "RequestSwap",
  component: RequestSwap,
  hocs: [withCurrentUser, [withAccess, memberAccessOptions], [withMulti, options]]
});
