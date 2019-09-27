/* 

components/MoviesList.jsx #tutorial-step-7 - 
The component for our list of movies, which we called in to modules/routes.js.

Wrapped with the "withList" and "withCurrentUser" containers.

#tutorial-step-11 -
Now, we are going to look at this in a bit more detail.
This component is a React component. We only have one but it does a bunch of things... 
*/

import React, { useState } from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent
} from "meteor/vulcan:core";
import Schedules from "../../modules/schedules/collection.js";

{
  /* These are "props". They are variables for the component that are passed by the components parent. 
  In this case, to create the parent we wrapped the component in "Higer Order Compoents" (See the Higer Order Compoents section below.) 
    By doing this, we can pass on those props to the children of he HOCs and give them access to the props... */
}

const SelectResident = ({
  results = [],
  onChange,
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  value,
  ...props
}) => {
  // console.log('***SelectResident***')
  // console.log(value)
  const renderResidentSelector = () => {
    const distincResidents = [...new Set(results.map(res => res.resident))].filter(res => res !== value)
    // console.log(distincResidents)
    let residents = distincResidents.map(res => {
      return { label: res, value: res };
    });
    residents = [{label: value, value: value}].concat(residents)
    // console.log("HEllo ******");
    // console.log(residents)
    return (
      <Components.FormComponentSelect
        inputProperties={{ options: residents, onChange: onChange }}
        {...props}
      />
    );
  };
  {
    return loading ? <Components.Loading /> : renderResidentSelector();
  }
};

const options = {
  collection: Schedules,
  fragmentName: "ScheduleMinimumInfo",
  limit: 0,
  pollInterval: 0
};

// These two functions (withList & withCurrentUser) are Higher Order Components (HOC) and by wrapping our component with this we can give it "props". (See the "props" section at the top.)
registerComponent({
  name: "SelectResident",
  component: SelectResident,
  hocs: [withCurrentUser, [withMulti, options]]
});

// #tutorial-step-12 - Well. that's it! If you like this, go on to the movies-example, where we get more granular when it comes to data loading.
// Well thanks for tuning in! Come visit us at our chat room at slack.vulcanjs.org. See you soon!
