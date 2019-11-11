// import { statuses } from '../../modules/data.js';

// export const userPosts = ({ input = { filterArguments: {}, } }) => {
//   if (!input.filterArguments.userId) {
//     throw new Error('[userPosts] filter requires a [userId] filter argument.');
//   }
//   return {
//   selector: {
//     userId: input.filterArguments.userId,
//     status: statusesOptions.approved,
//   },
// }

// /**
//  * @summary User posts view
//  */
// Posts.addView('userPosts', terms => );

// /**
//  * @summary User upvoted posts view
//  */
// Posts.addView('userUpvotedPosts', (terms, apolloClient) => {
//   var user = apolloClient ? Users.findOneInStore(apolloClient.store, terms.userId) : Users.findOne(terms.userId);

//   var postsIds = _.pluck(user.upvotedPosts, 'documentId');
//   return {
//     selector: {_id: {$in: postsIds}, userId: {$ne: terms.userId}}, // exclude own posts
//     options: {limit: 5, sort: {postedAt: -1}}
//   };
// });