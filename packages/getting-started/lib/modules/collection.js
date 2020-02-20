/*

The main Movies collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import permissions from './permissions.js';

let Movies;

/*

Movies collection definition

Uncomment on #Step6:

*/

// Movies = createCollection({

//   collectionName: 'Movies',

//   typeName: 'Movie',

//   schema,

//   // permissions, // uncomment on #Step17

//   // defaultInput: { sort: { createdAt: 'desc' } } // uncomment on #Step18
  
// });

export default Movies;