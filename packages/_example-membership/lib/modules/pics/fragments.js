/* 

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment PicsItemFragment on Pic {
    _id
    createdAt
    userId
    user {
      displayName
    }
    imageUrl
    body
  }
`);

registerFragment(/* GraphQL */`
  fragment PicsDetailsFragment on Pic {
    _id
    createdAt
    userId
    user {
      displayName
    }
    imageUrl
    body
  }
`);