import { registerFragment } from 'meteor/vulcan:core';

// note: fragment used by default on CategoriesList & PostsList fragments
registerFragment(/* GraphQL */`
  fragment DepartmentMinimumInfo on Department {
    _id
    department
  }
`);

