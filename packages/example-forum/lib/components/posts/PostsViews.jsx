import { Components, registerComponent, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Users from 'meteor/vulcan:users';
import queryString from 'querystring';

const PostsViews = (props, context) => {
  let views = ['top', 'new', 'best'];
  const adminViews = ['pending', 'rejected', 'scheduled'];

  if (Users.canDo(props.currentUser, 'posts.edit.all')) {
    views = views.concat(adminViews);
  }

  const query = queryString.parse(props.location.search);

  return (
    <div className="posts-views">
      <Components.Dropdown
        buttonProps={{ variant: 'secondary' }}
        id="views-dropdown"
        className="views"
        labelId={'posts.view'}
        menuItems={[
          ...views.map(view => ({
            to: { pathname: Utils.getRoutePath('posts.list'), query: { ...query, view: view } },
            labelId: `posts.${view}`,
          })),
          {
            to: '/daily',
            labelId: 'posts.daily',
          },
        ]}
      />
    </div>
  );
};

PostsViews.propTypes = {
  currentUser: PropTypes.object,
  defaultView: PropTypes.string,
};

PostsViews.defaultProps = {
  defaultView: 'top',
};

PostsViews.contextTypes = {
  currentRoute: PropTypes.object,
};

PostsViews.displayName = 'PostsViews';

registerComponent({ name: 'PostsViews', component: PostsViews, hocs: [withCurrentUser, withRouter] });
