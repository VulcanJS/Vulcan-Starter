import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router-dom';
import { Posts } from '../../modules/posts/index.js';
import moment from 'moment';
import { getLink, getLinkTarget, getPageUrl } from '../../modules/posts/helpers.js';
import Users from 'meteor/vulcan:users';

class PostsItem extends PureComponent {
  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? (
      <Components.PostsCategories post={this.props.post} />
    ) : (
      ''
    );
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? (
      <Components.PostsCommenters post={this.props.post} />
    ) : (
      ''
    );
  }

  renderActions() {
    return (
      <div className="posts-actions">
        <Components.ModalTrigger
          title="Edit Post"
          component={
            <a className="posts-action-edit">
              <FormattedMessage id="posts.edit" />
            </a>
          }
        >
          <Components.PostsEditForm post={this.props.post} />
        </Components.ModalTrigger>
      </div>
    );
  }

  render() {
    const { post, currentUser } = this.props;

    let postClass = 'posts-item';
    if (post.sticky) postClass += ' posts-sticky';

    return (
      <div className={postClass}>
        <div className="posts-item-vote">
          <Components.Vote collection={Posts} document={post} currentUser={currentUser} />
        </div>

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post} /> : null}

        <div className="posts-item-content">
          <h3 className="posts-item-title">
            <Link to={getLink(post)} className="posts-item-title-link" target={getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user ? (
              <div className="posts-item-user">
                <Components.UsersAvatar user={post.user} size="small" />
                <Components.UsersName user={post.user} />
              </div>
            ) : null}
            <div className="posts-item-date">
              {post.postedAt ? (
                moment(new Date(post.postedAt)).fromNow()
              ) : (
                <FormattedMessage id="posts.dateNotDefined" />
              )}
            </div>
            <div className="posts-item-comments">
              <Link to={getPageUrl(post)}>
                {!post.commentCount || post.commentCount === 0 ? (
                  <FormattedMessage id="comments.count_0" />
                ) : post.commentCount === 1 ? (
                  <FormattedMessage id="comments.count_1" />
                ) : (
                  <FormattedMessage id="comments.count_2" values={{ count: post.commentCount }} />
                )}
              </Link>
            </div>
            {Users.isAdmin(currentUser) && <Components.PostsStats post={post} />}
            {Users.canUpdate({ collection: Posts, document: post, user: currentUser }) && this.renderActions()}
          </div>
        </div>

        {this.renderCommenters()}
      </div>
    );
  }
}

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent({ name: 'PostsItem', component: PostsItem, hocs: [withCurrentUser] });
