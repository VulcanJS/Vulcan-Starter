/* 

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment CommentsItemFragment on Comment {
    _id
    createdAt
    userId
    user {
      displayName
    }
    picId
    body
    isDeleted
  }
`);