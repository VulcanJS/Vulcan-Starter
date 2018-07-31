/* 

List of movies. 
Wrapped with the "withMulti" and "withCurrentUser" containers.

*/

import React from 'react';
import { registerComponent, Components, withMulti, withCurrentUser, Loading } from 'meteor/vulcan:core';
import Helmet from 'react-helmet';

import Movies from '../../modules/movies/collection.js';

const MoviesList = ({results = [], currentUser, loading, loadMore, count, totalCount}) => 
  
  <div style={{maxWidth: '500px', margin: '20px auto'}}>

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
    </Helmet>
    
    {/* user accounts */}

    <div style={{padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc'}}>
    
      <Components.AccountsLoginForm />
    
    </div>

    {loading ? 

      <Loading /> :

      <div className="movies">
        
        {/* new document form */}

        <Components.MoviesNewForm />

        {/* documents list */}

        {results.map(movie => {
          return <Components.MoviesItem key={movie._id} movie={movie} currentUser={currentUser} />})}
        
        {/* load more */}

        {/*totalCount > results.length ?
          <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
          <p>No more items.</p>
        */}

      </div>
    }

  </div>

const options = {
  collection: Movies,
  fragmentName: 'MoviesItemFragment',
  limit: 5
};

registerComponent('MoviesList', MoviesList, withCurrentUser, [withMulti, options]);
