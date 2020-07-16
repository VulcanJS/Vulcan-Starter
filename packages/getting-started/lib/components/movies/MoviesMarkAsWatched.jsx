import React from 'react';
import { Components } from 'meteor/vulcan:core';

const MoviesMarkAsWatched = ({ document: movie }) =>
  movie.isWatched ? (
    <span>✓</span>
  ) : (
    <Components.MutationButton
      label="✓"
      variant="primary"
      mutationOptions={{
        name: 'markAsWatched',
        args: { movieId: 'String' },
        fragmentName: 'MovieFragment',
      }}
      mutationArguments={{ movieId: movie._id }}
    />
  );

export default MoviesMarkAsWatched;
