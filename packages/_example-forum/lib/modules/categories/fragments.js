import { registerFragment } from 'meteor/vulcan:core';

// note: fragment used by default on CategoriesList & PostsList fragments
registerFragment(/* GraphQL */`
  fragment CategoriesMinimumInfo on Category {
    _id
    name
    slug
  }
`);

registerFragment(/* GraphQL */`
  fragment CategoriesList on Category {
    ...CategoriesMinimumInfo
    description
    order
    image
    parentId
    parent {
      ...CategoriesMinimumInfo
    }
  }
`);
