import {
  Components,
  registerComponent,
  getFragment,
  withMessages,
  withList,
  withCurrentUser,
} from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router-dom';
import Users from 'meteor/vulcan:core';

const PostsNewForm = ({ loading, currentUser, redirect, closeModal, history, flash }) => {
  if (loading) {
    return (
      <div className="posts-new-form">
        <Components.Loading />
      </div>
    );
  }
  return Users.canCreate({ collection: Posts, user: currentUser }) ? (
    <div className="posts-new-form">
      <Components.SmartForm
        collection={Posts}
        mutationFragment={getFragment('PostPage')}
        successCallback={post => {
          closeModal();
          history.push({ pathname: redirect || Posts.getPageUrl(post) });
          flash({ id: 'posts.created_message', type: 'success' });
        }}
      />
    </div>
  ) : (
    <div>
      <p className="posts-new-form-message">
        <FormattedMessage id="posts.sign_up_or_log_in_first" />
      </p>
      <Components.AccountsLoginForm />
    </div>
  );
};

PostsNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
};

PostsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
};

PostsNewForm.displayName = 'PostsNewForm';

const options = {
  collectionName: 'Categories',
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoryItem',
  limit: 0,
  queryOptions: {
    pollInterval: 0,
  },
};

registerComponent({
  name: 'PostsNewForm',
  component: PostsNewForm,
  hocs: [withRouter, withMessages, [withList, options], withCurrentUser],
});
