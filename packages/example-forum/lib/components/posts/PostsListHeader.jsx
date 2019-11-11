import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsListHeader = () => {
  return (
    <div>
      <div className="posts-list-header">
        <Components.PostsViews />
        <div className="posts-list-header-categories">
          <Components.CategoriesMenu />
        </div>
        <Components.SearchForm />
      </div>
    </div>
  );
};

PostsListHeader.displayName = 'PostsListHeader';

registerComponent({ name: 'PostsListHeader', component: PostsListHeader });
