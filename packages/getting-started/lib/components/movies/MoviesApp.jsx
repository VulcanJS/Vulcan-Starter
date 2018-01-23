import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesApp = () => (
  <div className="app-content">
    <div className="movies-app">
      <Components.MoviesUsers />
      <Components.MoviesNew />
      <Components.MoviesList/>
    </div>
  </div>
);

registerComponent('MoviesApp', MoviesApp);
