import { registerFragment } from 'meteor/vulcan:core';
import { makeVoteable } from 'meteor/vulcan:voting';
import { Posts } from './posts/index.js';
import { Comments } from './comments/index.js';

makeVoteable(Posts);
makeVoteable(Comments);

// note: fragment used by default on the UsersProfile fragment
registerFragment(/* GraphQL */`
  fragment VotedItem on Vote {
    # vulcan:voting
    documentId
    power
    votedAt
  }
`);
