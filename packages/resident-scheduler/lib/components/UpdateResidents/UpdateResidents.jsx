import React, { useState } from "react";
import Helmet from "react-helmet";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent,
  withAccess
} from "meteor/vulcan:core";

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from "prop-types";
import { adminAccessOptions } from "../ResidentFunctions/ResidentFunctions.jsx";

const UpdateResidents = ({
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
      <Helmet>
        <link
          name="bootstrap"
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        />
      </Helmet>      {/* ... We have a test for the loding variable (See the "Higher Order Components" section at the bottom and then the "props" section at the top.)... */}
      {loading ? (
        <Components.Loading />
      ) : (
        <div className="schedules">
          {/* {console.log("******BEFORE*****")} */}
          {Schedules.options.mutations.create.check(currentUser) ? (
            <div
              style={{
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #ccc"
              }}
            >
              <h4>Manage Residents as {currentUser.username}</h4>
              {/* {console.log("******After*****")} */}

              {/* {console.log("****PREFILLED PROPS*****")} */}
              {/* {console.log(prefilledProps)} */}
              <Components.SmartForm
                collection={Schedules}
                // submitCallback={data => setCurrentResident(data.resident)}
                prefilledProps={prefilledProps}
                terms={terms}
                hideFields={['date']}
              ></Components.SmartForm>
            </div>
          ) : null}

          {/* documents list - this is another small utility in Vulcan and it will display it as a card... */}
          <div className="SchedulesContainer">
            {results.map(schedule => {
              return (
                <Components.Card
                  fields={["department"]}
                  key={schedule._id}
                  collection={Schedules}
                  document={schedule}
                  currentUser={currentUser}
                  terms={terms}
                  hideFields={['resident', 'date']}
                  prefilledProps = {{ department: schedule.department }}
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

UpdateResidents.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object
};

// ...this is where we specify how to load the data in the options object that we pass to withList
// if you want, you can specify many more options here, like how often to look for data or what fields to query from, filtering and sorting options. ...
const options = {
  collection: Schedules,
  limit: 7
};

// These two functions (withList & withCurrentUser) are Higher Order Components (HOC) and by wrapping our component with this we can give it "props". (See the "props" section at the top.)
registerComponent({
  name: "UpdateResidents",
  component: UpdateResidents,
  hocs: [
    withCurrentUser,
    [withAccess, adminAccessOptions],
    [withMulti, options]
  ]
});

// #tutorial-step-12 - Well. that's it! If you like this, go on to the movies-example, where we get more granular when it comes to data loading.
// Well thanks for tuning in! Come visit us at our chat room at slack.vulcanjs.org. See you soon!
