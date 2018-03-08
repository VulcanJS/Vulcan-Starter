import { extendFragment } from 'meteor/vulcan:core';

extendFragment('PostsList', /* GraphQL */`
  color # new custom property!
`);

extendFragment('PostsPage', /* GraphQL */`
  color # new custom property!
`);