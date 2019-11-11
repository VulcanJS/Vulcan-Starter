import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { Posts } from '../../modules/posts/index.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';

const Error = ({ error }) => (
  <Components.Alert className="flash-message" variant="danger">
    <FormattedMessage id={error.id} values={{ value: error.value }} />
    {error.message}
  </Components.Alert>
);

const PostsNoMore = () => (
  <p className="posts-no-more">
    <FormattedMessage id="posts.no_more" />
  </p>
);
const PostsLoading = () => (
  <div className="posts-load-more-loading">
    <Components.Loading />
  </div>
);

const PostsNoResults = props => (
  <p className="posts-no-results">
    <FormattedMessage id="posts.no_results" />
  </p>
);

const PostsLoadMore = ({ loading, loadMore, count, totalCount }) => (
  <div className={classNames('posts-load-more', { 'posts-load-more-loading': loading })}>
    <a
      className="posts-load-more-link"
      href="#"
      onClick={e => {
        e.preventDefault();
        loadMore();
      }}
    >
      <span>
        <FormattedMessage id="posts.load_more" />
      </span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
    {loading ? (
      <div className="posts-load-more-loader">
        <Components.Loading />
      </div>
    ) : null}
  </div>
);

const PostsList = ({
  className,
  results,
  loading,
  count,
  totalCount,
  loadMore,
  showHeader = true,
  showFooter = true,
  networkStatus,
  currentUser,
  error,
  terms = {},
}) => {
  const loadingMore = networkStatus === 2;
  const hasResults = results && results.length > 0;
  const hasMore = results && totalCount > results.length;

  const renderContents = () => {
    if (loading) {
      // loading
      return <PostsLoading />;
    } else if (results && results.length > 0) {
      // show results
      return results.map(post => (
        <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} />
      ));
    } else {
      // no results
      return <PostsNoResults />;
    }
  };

  const renderFooter = () => {
    if (hasMore) {
      // there are more posts to load
      return <PostsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} />;
    } else if (hasResults) {
      // there were posts, but there aren't any more to load
      return <PostsNoMore />;
    } else {
      // there were no posts to load at all
      return null;
    }
  };

  return (
    <div className={classNames(className, 'posts-list')}>
      {showHeader && <Components.PostsListHeader />}
      {error && <Error error={error} />}
      <div className="posts-list-content">{renderContents()}</div>
      {showFooter && <div className="posts-list-footer">{renderFooter()}</div>}
    </div>
  );
};

const options = {
  collection: Posts,
  fragmentName: 'PostItem',
};

registerComponent({ name: 'PostsList', component: PostsList, hocs: [withCurrentUser, [withMulti2, options]] });
