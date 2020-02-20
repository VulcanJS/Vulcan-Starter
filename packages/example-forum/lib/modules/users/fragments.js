import { registerFragment } from 'meteor/vulcan:core';

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(/* GraphQL */`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
    pageUrl
  }
`);

registerFragment(/* GraphQL */`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin
    #bio
    #htmlBio
    twitterUsername
    #website
    groups
    # vulcan:posts
    postCount
    # vulcan:comments
    # commentCount
  }
`);

