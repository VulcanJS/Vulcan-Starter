import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name: 'posts.top',        path: '/',                      componentName: 'PostsHome'},
  {name: 'posts.new',        path: '/new',                   componentName: 'PostsHome'}, 
  {name: 'posts.best',       path: '/best',                  componentName: 'PostsHome'},
  {name: 'posts.daily',      path: '/daily',                 componentName: 'PostsDaily'},
  {name: 'posts.single',     path: '/posts/:_id/:slug?',     componentName: 'PostsPage'},
  {name: 'users.profile',    path: '/users/:slug',           componentName: 'UsersProfile'},
  {name: 'users.account',    path: '/account',               componentName: 'UsersAccount'},
  {name: 'users.edit',       path: '/users/:slug/edit',      componentName: 'UsersAccount'},
  {name: 'admin.categories', path: '/admin/categories',      componentName: 'CategoriesDashboard'},
]);
