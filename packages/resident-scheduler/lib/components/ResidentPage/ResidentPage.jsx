

import React, { useState } from "react";
import Helmet from "react-helmet";
import {
  Components,
  withMulti,
  withCurrentUser,
  registerComponent
} from "meteor/vulcan:core";

import Schedules from "../../modules/schedules/collection.js";
import PropTypes from 'prop-types';

{
  /* These are "props". They are variables for the component that are passed by the components parent. 
  In this case, to create the parent we wrapped the component in "Higer Order Compoents" (See the Higer Order Compoents section below.) 
    By doing this, we can pass on those props to the children of he HOCs and give them access to the props... */
}

const ResidentPage
 = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
  terms,
  currentResident,
}) => {
  const prefilledProps= {resident: currentResident}
  //console.log(prefilledProps)
  // console.log(results)
  //console.log('****** TERMS ********')
  //console.log(terms)
  console.log("RESUlTS********")
  console.log(results)
  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      {/* First, this is a Helment tag. It's a React package that loads head tags. We're using it to load the Bootstrap stylesheet. 
      This is not Vulcan specific but it is an easy way to add tags to the head... */}
      <Helmet>
        <link
          name="bootstrap"
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        />
      </Helmet>

      {/* user accounts */}

      {/* ... We have a test for the loding variable (See the "Higher Order Components" section at the bottom and then the "props" section at the top.)... */}
      {loading ? (
        <Components.Loading />
      ) : (
        <div className="schedules">
          {/* new document form - this if for inserting new documents. Because the collection has the schema, when we generate the form, it know what the colleciton should look like
          You only need to specify the colleciton. You don't need to code any of the form. Validation will work and it will show you fields based on your user permission...*/}

          {Schedules.options.mutations.create.check(currentUser) ? (
            <div
              style={{  
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #ccc"
              }}
            >
              <h4>Create New Schedule for {currentResident}</h4>
              {/* {console.log(prefilledProps)} */}
              <Components.SmartForm
                collection={Schedules}
                // submitCallback={data => setCurrentResident(data.resident)}
                prefilledProps={prefilledProps}
                terms={terms}
              >
                </Components.SmartForm>
            </div>
          ) : null}

          {/* documents list - this is another small utility in Vulcan and it will display it as a card... */}
          {results.map(resident => {
            return (
              // resident.resident === currentResident && (
                <Components.Card
                  fields={["resident", "date"]}
                  key={resident._id}
                  collection={Schedules}
                  document={resident}
                  currentUser={currentUser}
                  terms={terms}
                />
              )
            // );
          })}

          {/* load more - this is the load more button. On click we trigger the loadMore function which is passed as a prop by withList... */}

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

ResidentPage.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
  currentResident: PropTypes.string,
  currentUser: PropTypes.object,
};

// ...this is where we specify how to load the data in the options object that we pass to withList
// if you want, you can specify many more options here, like how often to look for data or what fields to query from, filtering and sorting options. ...
const options = {
  collection: Schedules,
  limit: 7
};

// These two functions (withList & withCurrentUser) are Higher Order Components (HOC) and by wrapping our component with this we can give it "props". (See the "props" section at the top.)
registerComponent({
  name: "ResidentPage",
  component: ResidentPage,
  hocs: [withCurrentUser, [withMulti, options]]
});

// #tutorial-step-12 - Well. that's it! If you like this, go on to the movies-example, where we get more granular when it comes to data loading.
// Well thanks for tuning in! Come visit us at our chat room at slack.vulcanjs.org. See you soon!
