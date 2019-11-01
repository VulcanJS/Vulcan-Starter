import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withMulti2, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';

const PostsCommentsThread = ({ loading, postId, results, totalCount, currentUser }) => {
  if (loading) {
    return (
      <div className="posts-comments-thread">
        <Components.Loading />
      </div>
    );
  } else {
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, { idProperty: '_id', parentIdProperty: 'parentCommentId' });

    return (
      <div className="posts-comments-thread">
        <h4 className="posts-comments-thread-title">
          <FormattedMessage id="comments.comments" />
        </h4>
        <Components.CommentsList currentUser={currentUser} comments={nestedComments} commentCount={totalCount} />
        {!!currentUser ? (
          <div className="posts-comments-thread-new">
            <h4>
              <FormattedMessage id="comments.new" />
            </h4>
            <Components.CommentsNewForm postId={postId} type="comment" />
          </div>
        ) : (
          <div>
            <Components.ModalTrigger
              size="small"
              component={
                <a href="#">
                  <FormattedMessage id="comments.please_log_in" />
                </a>
              }
            >
              <Components.AccountsLoginForm />
            </Components.ModalTrigger>
          </div>
        )}
      </div>
    );
  }
};

PostsCommentsThread.displayName = 'PostsCommentsThread';

PostsCommentsThread.propTypes = {
  currentUser: PropTypes.object,
};

const options = {
  collectionName: 'Comments',
  queryName: 'commentsListQuery',
  fragmentName: 'CommentItem',
  limit: 0,
};

registerComponent({
  name: 'PostsCommentsThread',
  component: PostsCommentsThread,
  hocs: [[withMulti2, options], withCurrentUser],
});
