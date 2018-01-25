import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment MoviesFragment on Movie {
    _id
    createdAt
    name
    user{
      displayName
    }
  }
`);