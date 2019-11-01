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
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router-dom';

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

const CategoriesIds = ({ document: post }) => (
  <span>
    {post.categories && post.categories.map(category => <CategoryItem key={category._id} document={category} />)}
  </span>
);

const CategoryItem = ({ document: category }) => (
  <Link className="posts-category category-item" key={category._id} to={category.pageUrl}>
    {category.name}
  </Link>
);

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
        // { name: 'scheduledAt', label: 'Sched.', sortable: true, contents: 'date', filterable: true },
        { name: 'title', component: Title },
        { name: 'excerpt' },
        {
          name: 'categoriesIds',
          label: 'Categories',
          filterable: true,
          component: CategoriesIds,
        },
        {
          name: 'userId',
          label: 'User',
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
      newFormProps={{
        label: <FormattedMessage id="posts.new_post" />,
      }}
      // editFormProps={{
      //   addFields: ['clickCount'],
      // }}
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
