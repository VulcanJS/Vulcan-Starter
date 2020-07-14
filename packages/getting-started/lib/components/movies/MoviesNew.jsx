import React from 'react';
import { Components } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

// uncomment children on #Step15:
const MoviesNew = () => (
  <div className="movies-new">
    <Components.SmartForm collection={Movies} mutationFragmentName="MovieFragment"/>
  </div>
);

export default MoviesNew;