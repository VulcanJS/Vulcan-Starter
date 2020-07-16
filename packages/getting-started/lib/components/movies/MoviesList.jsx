import React from 'react';
import get from 'lodash/get';
import { Components, useMulti2 } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesList = () => {
  const items = {};

  // uncomment on #Step8
  // const useMulti2Object = useMulti2({
  //   collection: Movies,
  //   // fragmentName: 'MovieFragment', // uncomment on #Step9
  // });
  // items.loading = useMulti2Object.loading;
  // items.results = get(useMulti2Object, 'data.movies.results');

  return (
    <div className="movies-list">
      <div className="movies-contents">
        {items.loading ? (
          <Components.Loading />
        ) : (
          items.results && (
            <ul>
              {items.results.map((movie) => (
                <li key={movie.name}>
                  <h4>{movie.name}</h4>
                  {movie.review && <p>{movie.review}</p>}
                  {movie.user && (
                    <p>
                      <em>– {movie.user.displayName}</em>
                    </p>
                  )}
                  {movie.score && <p>IMDb Score: {movie.score}</p>}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default MoviesList;
