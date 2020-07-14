import React from 'react';
import { Components, replaceComponent } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';
import MoviesUsers from './MoviesUsers.jsx';

const MoviesApp2 = () => (
  <div className="app-content">
    <div className="movies-app">
      <MoviesUsers />
      <Components.Datatable 
        collection={Movies} 
        columns={['name', 'review']}
        // options={{ input: { sort: { name: 'asc' } } }} // uncomment on #Step18
      />
    </div>
  </div>
);

export default MoviesApp2;
