import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesList = ({ loading, results }) => (
  <div className="movies-list">
    <div className="user-accounts">
      {/* <Components.AccountsLoginForm redirect={false}/> */}
    </div>
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
  // add fragmentName property here
}

registerComponent('MoviesList', MoviesList, /* [withList, options] */);
