/*

Show a list of all reviews

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React from 'react';
import {
  Components,
  registerComponent,
  withMessages,
} from 'meteor/vulcan:core';
import Customers from '../modules/customers/collection';

const Home = ({ flash }) => (
  <div className="dashboard">
    <Components.FlashMessages />

    <div
      style={{
        padding: '20px 0',
        marginBottom: '20px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Components.AccountsLoginForm />
    </div>

    {/* <Components.SmartForm documentId="GFvYsTNgtKBgokFyD" collection={Customers}/> */}

    <Components.Datatable
      collection={Customers}
      columns={['name', 'meetingDate', 'stage', 'addresses', 'product', 'categories', 'isVIP', 'notes']}
      emptyState={<p className="datatable-empty">No customers to display</p>}
      options={{ fragmentName: 'customerFragment' }}
      /*

      Specify that the datatable's “new document” form should have its `meetingDate`
      prefilled to today's date; and also specify a success callback. 

      */
      newFormOptions={{
        prefilledProps: {
          meetingDate: new Date(),
        },
        successCallback: () => {
          flash({message: 'New customer created.', type: 'success'});
        },
      }}
    />
  </div>
);

registerComponent({ name: 'Home', component: Home, hocs: [withMessages] });
