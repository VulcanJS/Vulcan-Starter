import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment MovieFragment on Movie {
    _id
    createdAt
    userId
    user {
      displayName
    }
    name
    year
    review
    currentUserVotes{
      _id
      voteType
      power
    }
    baseScore
  }
`);

/*

Used for MyReactions

*/
registerFragment(/* GraphQL */`
  fragment UserMoviesVotes on User {
    _id
    votes(collectionName: "Movies"){
      _id
      voteType
      collectionName
      power
      documentId
    }
  }
`);

/*

Used for MyReactions2

*/
registerFragment(/* GraphQL */`
  fragment UserReactedMovies on User {
    _id
    reactedMovies{
      _id
      createdAt
      name
      year
      review
      currentUserVotes{
        _id
        voteType
        power
      }
      baseScore
    }
  }
`);