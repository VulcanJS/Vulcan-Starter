import React from 'react';
import { Components, registerComponent, withMulti } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesList = ({ loading, results }) => (
  <div className="movies-list">
    <div className="movies-contents">
    {loading ? 
      <Components.Loading/> :
      results && <ul>
        {results.map(movie => 
          <li key={movie.name}>
            <h4>{movie.name}</h4>
            {movie.review && <p>{movie.review}</p>}
            {movie.user && <p><em>– {movie.user.displayName}</em></p>}
          </li>
        )}
      </ul>
    }
    </div>
  </div>
);

const options = {
  collection: Movies,
  fragmentName: 'MoviesFragment', // uncomment on #Step11
}

registerComponent({ name: 'MoviesList', component: MoviesList, hocs: [ [withMulti, options] ] }); // uncomment on #Step10
