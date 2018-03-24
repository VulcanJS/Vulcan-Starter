import React from 'react';
import { Components, withList, registerComponent } from 'meteor/vulcan:core';

import ContactUsForm from '../modules/contact-us/collection.js';

const ContactUs = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
}) => (
  <div style={{ maxWidth: '500px', margin: '20px auto' }}>
    <h1>Get in contact</h1>

    {/*
      * Load the 'contact us' SmartForm no matter what and
      * display the latest submissions beneath the form
      *
      */}
    <Components.SmartForm collection={ContactUsForm} />

    {loading ? (
      <Components.Loading />
    ) : (
      <div>
        {results.map(userSubmission => (
          <Components.Card
            key={userSubmission._id}
            collection={ContactUsForm}
            document={userSubmission}
            currentUser={currentUser}
          />
        ))}

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

const options = {
  collection: ContactUsForm,
  limit: 10,
};

registerComponent('ContactUs', ContactUs, [withList, options]);
