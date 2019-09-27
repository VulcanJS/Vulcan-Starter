import React from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent,
  withAccess
} from "meteor/vulcan:core";

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from "prop-types";
import { Link }  from 'react-router-dom'

const SchedulerFunctions = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  currentResident,
  history
}) => {
    const renderFunctionLinks = () => (
        <div>
            <Link className="Link" to={`/scheduleresidents`}>Schedule Residents</Link>
            <Link className="Link" to={`/manageresidents`}>Manage Residents</Link>
            <Link className="Link" to={`/managedepartments`}>Manage Departments</Link>
            <Link className="Link" to={`/manageshifts`}>Manage Shifts</Link>
            <Link className="Link" to={`/manageblocks`}>Manage Blocks</Link>
            <Link className="Link" to={`/test`}>Schedule Service Blocks</Link>
        </div>
    )

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Components.Header />
      {loading ? <Components.Loading /> : renderFunctionLinks()}
    </div>
  );
};

SchedulerFunctions.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

const options = {
  collection: Schedules,
  limit: 7
};

export const adminAccessOptions = {
    groups: ['admins'],
    redirect: '/'
  }

registerComponent({
  name: "SchedulerFunctions",
  component: SchedulerFunctions,
  hocs: [withCurrentUser, [withAccess, adminAccessOptions], [withMulti, options]]
});
