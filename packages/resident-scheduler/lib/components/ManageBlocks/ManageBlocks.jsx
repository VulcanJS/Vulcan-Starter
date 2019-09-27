

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

const ManageBlocks = ({
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
      <Components.SchedulerHeader />
      <div>ManageBlocks PlaceHolder</div>
    </div>
  );
};

ManageBlocks.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object,
};

const options = {
  collection: Schedules,
  limit: 7
};

registerComponent({
  name: "ManageBlocks",
  component: ManageBlocks,
  hocs: [withCurrentUser, [withAccess, adminAccessOptions], [withMulti, options]]
});
