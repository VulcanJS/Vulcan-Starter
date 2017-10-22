/*

List of movies.
Wrapped with the "withList" and "withCurrentUser" containers.

*/

import React from 'react';
import Helmet from 'react-helmet';
import { Components, withList, withCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

const MoviesList = ({results = [], currentUser, loading, loadMore, count, totalCount}) =>

  <div style={{maxWidth: '600px', margin: '20px auto'}}>

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
      <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
    </Helmet>

    <h4 data-cuke='subTitle'>This is from the 'example-simple' package</h4>
    <div><b>Special 'beta' feature !!</b><br/>This example has acceptance (end to end) testing with Cucumber.</div>
      To use it, open a command line terminal window, go to the base directory of your project and type :<br/>
<br/><pre className="prettyprint">
  # Automated install (tested for Ubuntu/Debian only, so far)<br/>
  .scripts/e2e/installChimp.js<br/>
  # Run acceptance tests<br/>
  meteor npm run acceptance
</pre>
       Currently, the first step will only work in Ubuntu/Debian distributions.  In other environments you will
       need to follow <a href='https://chimp.readme.io/docs/installation' target="_blank">Chimp's installation procedure.</a>

    {/* user accounts */}

    <div style={{padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc'}}>

      <Components.AccountsLoginForm />

    </div>

    {loading ?

      <Components.Loading /> :

      <div className="movies">

        {/* new document form */}

        {Movies.options.mutations.new.check(currentUser) ?
          <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc'}}>
            <h4>Insert New Document</h4>
            <Components.SmartForm collection={Movies} />
          </div> :
          null
        }

        {/* documents list */}

        {results.map(movie => <Components.Card fields={['name', 'year', 'review']} key={movie._id} collection={Movies} document={movie} currentUser={currentUser} />)}

        {/* load more */}

        {totalCount > results.length ?
          <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> :
          <p>No more items.</p>
        }

      </div>
    }

  </div>

const options = {
  collection: Movies,
  limit: 5,
};

registerComponent('MoviesList', MoviesList, withCurrentUser, [withList, options]);
