import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesNew = () => (
  <div className="movies-new">
    {/* <Components.SmartForm collection={Movies} mutationFragmentName="MoviesFragment"/> */} {/* <- add form here */}
  </div>
);

registerComponent('MoviesNew', MoviesNew);
