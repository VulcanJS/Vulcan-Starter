import { Components, registerComponent, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Users from 'meteor/vulcan:users';
import qs from 'qs';

class PostsViews extends Component {
  getQuery = () => {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true }) || {};
  };

  getMenuItems = () => {
    const currentView = this.getQuery().view;

    let views = ['top', 'new', 'best'];
    
    if (Users.isAdmin(this.props.currentUser)) {
      views = [...views, 'pending', 'rejected', 'scheduled'];
    }

    return [
      ...views.map(view => ({
        to: { pathname: Utils.getRoutePath('posts.list'), search: qs.stringify({ ...this.getQuery(), view }) },
        labelId: `posts.${view}`,
        linkProps: {
          isActive: () => {
            return view === currentView || this.props.location.pathname === Utils.getRoutePath('posts.list') && view === 'top' && !currentView;
          },
        },
      })),
      {
        to: '/daily',
        labelId: 'posts.daily',
      },
    ];
  };

  render() {
    return (
      <div className="posts-views">
        <Components.Dropdown
          buttonProps={{ variant: 'secondary' }}
          id="views-dropdown"
          className="views"
          labelId={'posts.view'}
          menuItems={this.getMenuItems()}
        />
      </div>
    );
  }
}

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
