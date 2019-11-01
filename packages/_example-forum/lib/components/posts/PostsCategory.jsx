import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import get from 'lodash/get';

const PostsCategory = ({ match }) => {
  const slug = get(match, 'params.slug');
  // const input = { where: { categoriesIds: { _arrayContains: categoryId } } };
  const input = { filter: 'category', filterArguments: { slug } };
  return <Components.PostsList input={input} />;
};

PostsCategory.displayName = 'PostsCategory';

registerComponent({ name: 'PostsCategory', component: PostsCategory });
