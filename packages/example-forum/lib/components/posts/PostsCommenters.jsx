import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';
import take from 'lodash/take';

const PostsCommenters = ({ post }) => {
  return (
    <div className="posts-commenters">
      <div className="posts-commenters-avatars">
        {take(post.commenters, 4).map(
          user => user && <Components.UsersAvatar key={user._id} user={user} />
        )}
      </div>
      <div className="posts-commenters-discuss">
        <Link to={post.pagePath}>
          <Components.Icon name="comment" />
          <span className="posts-commenters-comments-count">
            {post.comments && post.comments.length}
          </span>
          <span className="sr-only">Comments</span>
        </Link>
      </div>
    </div>
  );
};

PostsCommenters.displayName = 'PostsCommenters';

registerComponent({ name: 'PostsCommenters', component: PostsCommenters });
