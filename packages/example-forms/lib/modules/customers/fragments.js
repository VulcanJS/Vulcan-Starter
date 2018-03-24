/* 

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core';

// TODO: extend this fragment
registerFragment(`
  fragment CustomersItemFragment on Customer {
    _id
    state
    name
    email
    addresses
  }
`);