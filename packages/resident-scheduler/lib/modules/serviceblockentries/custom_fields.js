// /*

// Custom `reactedServiceBlockEntries` GraphQL virtual field on Users collection.
// Used for MyReactions2 example. 

// */
// import Users from 'meteor/vulcan:users';
// import ServiceBlockEntries from './movies/index.js';

// Users.addField([
//   /**
//     An array containing votes
//   */
//   {
//     fieldName: 'serviceBlockEntries',
//     fieldSchema: {
//       type: Array,
//       optional: true,
//       canRead: Users.owns,
//       resolveAs: {
//         type: '[ServiceBlockEntry]',
//         resolver: async (user, args, { currentUser }) => {
//           const votes = Votes.find({userId: currentUser._id, collectionName: 'ServiceBlockEntries'}).fetch();
//           const votedServiceBlockEntriesIds = _.unique(_.pluck(votes, 'documentId'));
//           const movies = ServiceBlockEntries.find(
//             {
//               _id: {$in: votedServiceBlockEntriesIds}, 
//               userId: {$ne: currentUser._id}
//             }, 
//             {
//               limit: 5, 
//               sort: {postedAt: -1}
//             }
//           ).fetch();
//           return movies;
//         }
//       },
//     }
//   },
//   {
//     fieldName: 'reactedServiceBlockEntries.$',
//     fieldSchema: {
//       type: Object,
//       optional: true
//     }
//   },
// ]);

// ``
