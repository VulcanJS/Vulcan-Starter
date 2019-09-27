import { registerFragment } from 'meteor/vulcan:core';

// note: fragment used by default on CategoriesList & PostsList fragments
registerFragment(/* GraphQL */`
  fragment ScheduleMinimumInfo on Schedule {
    _id
    userId
    resident
  }
`);

