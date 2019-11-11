import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router-dom';
import { Posts } from '../../modules/posts/index.js';
import moment from 'moment';
import Users from 'meteor/vulcan:users';
import { withRouter } from 'react-router-dom';

const PostsItem = ({ post, currentUser, match, history, flash }) => {
  let postClass = 'posts-item';
  if (post.sticky) postClass += ' posts-sticky';

  return (
    <div className={postClass}>
      <div className="posts-item-vote">
        <Components.Vote collection={Posts} document={post} currentUser={currentUser} />
      </div>

      <div className="posts-item-content">
        <h3 className="posts-item-title">
          {post.url ? (
            <a className="posts-item-title-link" href={post.url} target="_blank">
              {post.title}
            </a>
          ) : (
            <Link to={post.pagePath} className="posts-item-title-link">
              {post.title}
            </Link>
          )}
          {post.categories && post.categories.length > 0 && <Components.PostsCategories post={post} />}
        </h3>

        <div className="posts-item-meta">
          {post.user ? (
            <div className="posts-item-user">
              <Components.UsersAvatar user={post.user} size="small" />
              <Components.UsersName user={post.user} />
            </div>
          ) : null}
          <div className="posts-item-date">
            {post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined" />}
          </div>
          <div className="posts-item-comments">
            <Link to={post.pagePath}>
              {!post.comments || post.comments.length === 0 ? (
                <FormattedMessage id="comments.count_0" />
              ) : post.comments.length === 1 ? (
                <FormattedMessage id="comments.count_1" />
              ) : (
                <FormattedMessage id="comments.count_2" values={{ count: post.comments.length }} />
              )}
            </Link>
          </div>
          {Users.isAdmin(currentUser) && <Components.PostsStats post={post} />}
          {Users.canUpdate({ collection: Posts, document: post, user: currentUser }) && (
            <div className="posts-actions">
              <Components.EditButton
                collection={Posts}
                documentId={post._id}
                successCallback={post => {
                  flash({ id: 'posts.edit_success', properties: { title: post.title }, type: 'success' });
                }}
                removeSuccessCallback={() => {
                  // redirect to index
                  if (match.params._id) {
                    history.push('/');
                  }
                  flash({ id: 'posts.delete_success', properties: { title: post.title }, type: 'success' });
                }}
                component={
                  <a className="posts-action-edit">
                    <FormattedMessage id="posts.edit" />
                  </a>
                }
              />
            </div>
          )}
        </div>
      </div>
      {post.commenters && post.commenters.length > 0 && <Components.PostsCommenters post={post} />}
    </div>
  );
};

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent({ name: 'PostsItem', component: PostsItem, hocs: [withCurrentUser, withRouter, withMessages] });
