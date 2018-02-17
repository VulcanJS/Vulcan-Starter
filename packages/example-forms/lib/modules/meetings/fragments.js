/* 

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core';

// TODO: extend this fragment
registerFragment(`
  fragment MeetingsItemFragment on Meetings{
    _id
    date
    userId
    customerId
    address
  }
`);