import React from 'react';
import MoviesUsers from './MoviesUsers';
import MoviesNew from './MoviesNew';
import MoviesList from './MoviesList';

const MoviesApp = () => (
  <div className="app-content">
    <div className="movies-app">
      <MoviesUsers />
      <MoviesNew />
      <MoviesList />
    </div>
  </div>
);

export default MoviesApp;
