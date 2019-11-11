import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { Comments } from '../../modules/comments/collection.js';

const AdminComments = () => (
  <div className="admin-comments">
    <Components.Datatable
      collection={Comments}
      options={{
        fragmentName: 'CommentItemAdmin',
      }}
      columns={[
        {
          name: 'createdAt',
        },
        {
          name: 'postedAt',
        },
        {
          name: 'body',
        },
        {
          name: 'postId',
          label: 'Post',
        },
        {
          name: 'userId',
          label: 'User',
        },
      ]}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminComments', AdminComments, [withAccess, accessOptions]);

export default AdminComments;
