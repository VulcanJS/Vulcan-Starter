import { Components, registerComponent, withSingle, withCurrentUser } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';
import React, { Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import mapProps from 'recompose/mapProps';

class PostsPage extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="posts-page">
          <Components.Loading />
        </div>
      );
    } else if (!this.props.document) {
      return (
        <div className="posts-page">
          <FormattedMessage id="app.404" />
        </div>
      );
    } else {
      const post = this.props.document;

      const htmlBody = { __html: post.htmlBody };

      return (
        <div className="posts-page">
          <Components.HeadTags
            url={post.pageUrl}
            title={post.title}
            image={post.thumbnailUrl}
            description={post.excerpt}
          />

          <Components.PostsItem post={post} currentUser={this.props.currentUser} />

          {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}

          <Components.PostsCommentsThread postId={post._id} input={{ filter: { postId: { _eq: post._id } } }} />
        </div>
      );
    }
  }
}

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostPage',
};

const mapPropsFunction = props => ({
  ...props,
  documentId: props.match && props.match.params._id,
});

registerComponent(
  // component name used by Vulcan
  'PostsPage',
  // React component
  PostsPage,
  mapProps(mapPropsFunction),
  // HOC to give access to the current user
  withCurrentUser,
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withSingle, queryOptions]
);
