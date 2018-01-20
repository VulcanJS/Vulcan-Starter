import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';

const MoviesList = ({ loading, results }) => (
  <div className="movies-list">
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
);

registerComponent('MoviesList', MoviesList);
