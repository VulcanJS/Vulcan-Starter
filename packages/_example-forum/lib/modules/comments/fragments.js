import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment CommentItem on Comment {

    _id
    postId
    parentCommentId
    topLevelCommentId
    body
    htmlBody
    postedAt

    userId
    user {
      ...UsersMinimumInfo
    }

    postId
    post {
      _id
      title
      pagePath
      # commentCount
      commenters {
        ...UsersMinimumInfo
      }
    }

    currentUserVotes{
      ...VoteFragment
    }
    baseScore
    score
  }
`);


registerFragment(/* GraphQL */`
  fragment CommentItemAdmin on Comment {

    ...CommentItem
    
    createdAt
    
  }
`);

