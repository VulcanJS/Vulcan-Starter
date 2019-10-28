/*

Show a list of all bookings

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import moment from 'moment';
import { statusesReverse } from '../../modules/data.js';
import { Posts } from '../../modules/posts/collection.js';

const Title = ({ document: post }) => (
  <div>
    <div>
      <a target="_blank" href={post.url}>
        {post.title}
      </a>
    </div>
    <span>
      <span className="post-domain">{post.domain}</span>
    </span>
  </div>
);

const Status = ({ document: post }) => (
  <span className={`status-indicator status-indicator-${statusesReverse[post.status]}`}>
    {statusesReverse[post.status]}
  </span>
);

const CategoryToken = ({ document: category }) => (
  <span className="admin-posts-category category-item">{category.name}</span>
);
registerComponent({ name: 'CategoryToken', component: CategoryToken });

const CardItemDate = ({ value }) => {
  const m = moment(new Date(value));
  return (
    <div className="contents-date">
      <div>
        <span className="date-year">{m.format('YYYY')}</span>
        <span className="date-month">{m.format('MM')}</span>
        <span className="date-day">{m.format('DD')}</span>
      </div>
      <div>
        <span className="date-time">{m.format('hh:mm')}</span>
      </div>
    </div>
  );
};

const AdminPosts = () => (
  <div className="admin-posts">
    <Components.Datatable
      collection={Posts}
      columns={[
        { name: 'createdAt', label: 'Created', sortable: true, contents: 'date', filterable: true },
        { name: 'postedAt', label: 'Posted', sortable: true, contents: 'date', filterable: true },
        { name: 'scheduledAt', label: 'Sched.', sortable: true, contents: 'date', filterable: true },
        { name: 'title', component: Title },
        { name: 'htmlBody', contents: 'html' },
        {
          name: 'categoriesIds',
          label: 'Categories',
          filterable: true,
          // component: CategoriesIds
        },
        { name: 'thumbnailUrl', contents: 'image' },
        {
          name: 'userId',
          //  component: User
        },
        { name: 'status', filterable: true, component: Status },
      ]}
      rowClass={post => `post-item post-item-status-${statusesReverse[post.status]}`}
      options={{
        fragmentName: 'PostItem',
      }}
      showNew={true}
      showEdit={true}
      newFormOptions={{
        queryFragmentName: 'PostItem',
      }}
      editFormOptions={{
        queryFragmentName: 'PostItem',
        addFields: ['clickCount'],
      }}
      components={{
        CardItemDate,
      }}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminPosts', AdminPosts);

export default AdminPosts;
