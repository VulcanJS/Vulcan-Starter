import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment MovieFragment on Movie {
    _id
    createdAt
    name
    isWatched

    # uncomment on #Step10
    # user{
    #  displayName
    # }

    # uncomment on #Step11
    # score
    
  }
`);