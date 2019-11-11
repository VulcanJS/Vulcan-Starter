import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment CategoryItem on Category {
    _id
    name
    slug
    pagePath
  }
`);