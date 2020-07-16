import { extendCollection } from 'meteor/vulcan:core';
import Movies from '../modules/collection.js';

import { apiSchema } from './apischema.js';

extendCollection(Movies, {
  apiSchema,
});
