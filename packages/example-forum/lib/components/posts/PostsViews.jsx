import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { postViews } from '../../modules/data.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router-dom';

const PostsViews = () => (
  <ul className="posts-views">
    <li>
      <FormattedMessage id="posts.sort_by" />
    </li>
    {postViews.map(({ name, path }) => (
      <li className="posts-view" key={name}>
        <Link to={path}>
          <FormattedMessage id={name} />
        </Link>
      </li>
    ))}
  </ul>
);

registerComponent({ name: 'PostsViews', component: PostsViews });
