import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'movies', path: '/', componentName: 'MoviesList' });
addRoute({ name: 'moviesSingle', path: '/movie/:id', componentName: 'MoviesSingle'})
