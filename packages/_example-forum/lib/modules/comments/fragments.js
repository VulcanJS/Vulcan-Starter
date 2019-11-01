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

    post {
      _id
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

