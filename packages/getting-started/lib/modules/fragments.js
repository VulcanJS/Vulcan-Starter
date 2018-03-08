import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment MoviesFragment on Movie {
    _id
    createdAt
    name
    # uncomment on #Step12
    # user{
    #  displayName
    # }
  }
`);