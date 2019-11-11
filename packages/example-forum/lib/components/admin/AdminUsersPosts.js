import React from 'react';
import { Link } from 'react-router-dom';

const AdminUsersPosts = ({ document: user }) => (
  <ul>
    {user.posts &&
      user.posts.map(post => (
        <li key={post._id}>
          <Link to={post.pagePath}>{post.title}</Link>
        </li>
      ))}
  </ul>
);

export default AdminUsersPosts;
