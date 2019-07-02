/* 

List of comments. 
Wrapped with the "withList" and "withCurrentUser" containers.

All props except currentUser are passed by the withList container. 

*/

import React from 'react';
import { registerComponent, Components, withList, withCurrentUser } from 'meteor/vulcan:core';

import Comments from '../../modules/comments/collection.js';

const CommentsList = ({results = [], currentUser, loading, loadMore, count, totalCount}) => 
  
  <div className="comments-list">

    {loading ? 

      <Components.Loading /> :

      <div className="comments-items">
        {results.map(comment => <Components.CommentsItem key={comment._id} comment={comment} currentUser={currentUser} />)}
      </div>
      
    }

  </div>

const options = {
  collection: Comments,
  fragmentName: 'CommentsItemFragment',
};

registerComponent({ name: 'CommentsList', component: CommentsList, hocs: [withCurrentUser, [withList, options]] });