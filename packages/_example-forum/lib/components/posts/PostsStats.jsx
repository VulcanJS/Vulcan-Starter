import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsStats = ({post}) => {

  return (
    <div className="posts-stats">
      {post.score ? <span className="posts-stats-item" title="Score"><Components.Icon name="score"/> {Math.floor((post.score || 0)*10000)/10000} <span className="sr-only">Score</span></span> : ""}
    </div>
  )
}

PostsStats.displayName = "PostsStats";

registerComponent({ name: 'PostsStats', component: PostsStats });