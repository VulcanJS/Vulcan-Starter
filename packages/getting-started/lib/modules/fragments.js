import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment MovieFragment on Movie {
    _id
    createdAt
    name
    # uncomment on #Step12
    user{
     displayName
    }
  }
`);