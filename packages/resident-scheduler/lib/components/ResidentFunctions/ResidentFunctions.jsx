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

const ResidentFunctions = ({
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
  console.log("****ResidentFunctions****")
    const renderFunctionLinks = () => (
        <div>
            <Link className="Link" to={`/acceptschedule`}>Accept Schedule</Link>
            <Link className="Link" to={`/requestvacation`}>Request Vacation</Link>
            <Link className="Link" to={`/requestswap`}>Request a swap</Link>
        </div>
    )

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Components.Header />
      {loading ? <Components.Loading /> : renderFunctionLinks()}
    </div>
  );
};

ResidentFunctions.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

const options = {
  collection: Schedules,
  limit: 7
};

export const adminAccessOptions = {
    groups: ['members'],
    redirect: '/'
  }

registerComponent({
  name: "ResidentFunctions",
  component: ResidentFunctions,
  hocs: [withCurrentUser, [withAccess, adminAccessOptions], [withMulti, options]]
});
