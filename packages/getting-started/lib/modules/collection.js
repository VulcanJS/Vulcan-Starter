/*

The main Movies collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import permissions from './permissions.js';

let Movies;

/*

Movies collection definition

Uncomment on #Step4:

*/

// Movies = createCollection({

//   collectionName: 'Movies',

//   typeName: 'Movie',

//   schema,

//   // permissions, // uncomment on #Step16

// });

export default Movies;