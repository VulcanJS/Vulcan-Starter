import React from 'react';
import { registerComponent, Components, withSingle } from 'meteor/vulcan:core';
import Movies from '../../modules/movies/collection';
import { Link } from 'react-router';

/**
 * MoviesSingle - Top level component at the route /movie/:id
 *  It just passes the param id (passed by the router, from the url) to MoviesSingleInner that is wrapped with withSingle to fetch the data
 * @param  {object} props
 */
function MoviesSingle(props) {
  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <Components.MoviesSingleInner documentId={props.params.id} />
    </div>
  );
}

registerComponent({ name: 'MoviesSingle', component: MoviesSingle });

/**
 * MoviesSingleInner - wrapped with withSingle, it displays a movie page
 *
 * @param  {type} props description
 * @return {type}       description
 */

function MoviesSingleInner(props) {
  if (props.loading) {
    return <Components.Loading />;
  } else {
    return (
      <div>
        <div className="jumbotron" style={{ border: '1px solid #ccc' }}>
          <h1 style={{ paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #ccc' }}>{props.document.name}</h1>
          <h2> {props.document.year}</h2>
          <p>{props.document.review}</p>
        </div>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

/**
 * Options for the withSingle hoc
 * You still need to pass a 'documentId' or 'slug' prop to identify which movie you want to display
 */

const singleOptions = {
  collection: Movies,
  fragmentName: 'MoviesItemFragment',
};

registerComponent({ name: 'MoviesSingleInner', component: MoviesSingleInner, hocs: [[withSingle, singleOptions]] });
