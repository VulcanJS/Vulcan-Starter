

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

const AcceptSchedule = ({
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
      <div>AcceptSchedule PlaceHolder</div>
    </div>
  );
};

AcceptSchedule.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object,
};

const options = {
  collection: Schedules,
  limit: 7
};

export const memberAccessOptions = {
  groups: ['members'],
  redirect: '/'
}

registerComponent({
  name: "AcceptSchedule",
  component: AcceptSchedule,
  hocs: [withCurrentUser, [withAccess, memberAccessOptions], [withMulti, options]]
});
