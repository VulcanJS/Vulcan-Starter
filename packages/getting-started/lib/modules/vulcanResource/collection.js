/*

The main Movies collection definition file.

*/
import { createCollection } from 'meteor/vulcan:core';
import schema from './schema';
import { vulcanResourcePermissions } from './vulcanResource';

const VulcanResources = createCollection({
  collectionName: 'VulcanResources',

  typeName: 'VulcanResource',

  schema,

  permissions: vulcanResourcePermissions,
});

export default VulcanResources;
