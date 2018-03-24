/*

Show a list of all reviews

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import Customers from '../modules/customers/collection';

const Home = () => (
  <div className="dashboard">
    <div
      style={{
        padding: '20px 0',
        marginBottom: '20px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Components.AccountsLoginForm />
    </div>

    <Components.Datatable
      collection={Customers}
      columns={['name', 'addresses']}
      emptyState={<p className="datatable-empty">No customers to display</p>}
    />
  </div>
);

registerComponent('Home', Home);
