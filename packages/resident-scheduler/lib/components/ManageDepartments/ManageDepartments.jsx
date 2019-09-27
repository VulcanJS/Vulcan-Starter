import React, { useState } from "react";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent,
  withAccess
} from "meteor/vulcan:core";

import Departments from "../../modules/departments/collection.js";
import PropTypes from "prop-types";
import { adminAccessOptions } from "../ResidentFunctions/ResidentFunctions.jsx";

const ManageDepartments = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  currentResident
}) => {
  const [page, setPage] = useState(0);
  const [showPageDown, setShowPageDown] = useState(false);
  const [showPageUp, setShowPageUp] = useState(false);
  const prefilledProps = { resident: currentResident };

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      <Components.SchedulerHeader />
      {/* ... We have a test for the loding variable (See the "Higher Order Components" section at the bottom and then the "props" section at the top.)... */}
      {loading ? (
        <Components.Loading />
      ) : (
        <div className="departments">
          {console.log("******BEFORE*****")}
          {Departments.options.mutations.create.check(currentUser) ? (
            <div
              style={{
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #ccc"
              }}
            >
              <h4>Create New Department as {currentUser.username}</h4>
              {console.log("******After*****")}

              {console.log("****PREFILLED PROPS*****")}
              {console.log(prefilledProps)}
              <Components.SmartForm
                collection={Departments}
                // submitCallback={data => setCurrentResident(data.resident)}
                // prefilledProps={prefilledProps}
                //terms={terms}
              ></Components.SmartForm>
            </div>
          ) : null}

          {/* documents list - this is another small utility in Vulcan and it will display it as a card... */}
          <div className="SchedulesContainer">
            {results.map(department => {
              return (
                <Components.Card
                  fields={["department"]}
                  key={department._id}
                  collection={Departments}
                  document={department}
                  currentUser={currentUser}
                  terms={terms}
                />
              );
            })}
          </div>

          {/* load more - this is the load more button. On click we trigger the loadMore function which is passed as a prop by withList... */}
          {/*Limit Offset*/}
          {totalCount > results.length ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                loadMore();
              }}
            >
              Load More ({count}/{totalCount})
            </a>
          ) : (
            <p>No more items.</p>
          )}
        </div>
      )}
    </div>
  );
};

ManageDepartments.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

// ...this is where we specify how to load the data in the options object that we pass to withList
// if you want, you can specify many more options here, like how often to look for data or what fields to query from, filtering and sorting options. ...
const options = {
  collection: Departments,
  limit: 7
};

// These two functions (withList & withCurrentUser) are Higher Order Components (HOC) and by wrapping our component with this we can give it "props". (See the "props" section at the top.)
registerComponent({
  name: "ManageDepartments",
  component: ManageDepartments,
  hocs: [
    withCurrentUser,
    [withAccess, adminAccessOptions],
    [withMulti, options]
  ]
});

// #tutorial-step-12 - Well. that's it! If you like this, go on to the movies-example, where we get more granular when it comes to data loading.
// Well thanks for tuning in! Come visit us at our chat room at slack.vulcanjs.org. See you soon!
