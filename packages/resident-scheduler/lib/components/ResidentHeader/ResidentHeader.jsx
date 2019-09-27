import React from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent
} from "meteor/vulcan:core";

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from "prop-types";

{
  /* These are "props". They are variables for the component that are passed by the components parent. 
  In this case, to create the parent we wrapped the component in "Higer Order Compoents" (See the Higer Order Compoents section below.) 
    By doing this, we can pass on those props to the children of he HOCs and give them access to the props... */
}

const ResidentHeader = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  currentResident
}) => {
  console.log("ResidentHeader*****")
  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      {/* First, this is a Helment tag. It's a React package that loads head tags. We're using it to load the Bootstrap stylesheet. 
      This is not Vulcan specific but it is an easy way to add tags to the head... */}
      {loading ? <Components.Loading /> : <Components.ResidentFunctions />}
    </div>
  );
};

ResidentHeader.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

const options = {
  collection: Schedules,
  limit: 7
};

registerComponent({
  name: "ResidentHeader",
  component: ResidentHeader,
  hocs: [withCurrentUser, [withMulti, options]]
});