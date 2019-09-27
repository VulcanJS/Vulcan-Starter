import { registerFragment } from 'meteor/vulcan:core';

// note: fragment used by default on CategoriesList & PostsList fragments
registerFragment(/* GraphQL */`
  fragment ServiceBlockMinimumInfo on Schedule {
    _id
    blockInfo
  }
`);

