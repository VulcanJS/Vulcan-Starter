import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';

const PostsCategories = ({ post }) => {
  return (
    <div className="posts-categories">
      {post.categories.map(({ _id, pagePath, name }) => (
        <Link className="posts-category category-item" key={_id} to={pagePath}>
          {name}
        </Link>
      ))}
    </div>
  );
};

registerComponent({ name: 'PostsCategories', component: PostsCategories });
