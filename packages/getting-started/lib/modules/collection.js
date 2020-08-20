/*

The main Movies collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

let Movies;

/*

Movies collection definition

Uncomment on #Step4:

*/

// Movies = createCollection({

//   collectionName: 'Movies',

//   typeName: 'Movie',

//   schema,

//   // uncomment on #Step16
//   // permissions: {
//   //   canRead: ['guests'],
//   //   canCreate: ['members'],
//   //   canUpdate: ['owners'],
//   //   canDelete: ['owners'],
//   // },

// });

export default Movies;