import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment MoviesFragment on Movie {
    _id
    name
    user{
      displayName
    }
  }
`);