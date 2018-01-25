import React from 'react';
import { Components, replaceComponent } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesApp2 = () => (
  <div className="app-content">
    <div className="movies-app">
      <Components.MoviesUsers />
      <Components.Datatable 
        collection={Movies} 
        columns={['name', 'review']}
        // options={{ terms: { view: 'alphabetical' } }} // uncomment on #Step18
      />
    </div>
  </div>
);

replaceComponent('MoviesApp', MoviesApp2);
