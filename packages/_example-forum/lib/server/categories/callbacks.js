// /*


// Callbacks to validate categories and generate category slugs

// */

// import { Categories } from '../../modules/categories/collection.js';

// export function checkCategories ({ document }) {
//   // if there are no categories, stop here
//   if (!document.categories || document.categories.length === 0) {
//     return;
//   }
//   // check how many of the categories given also exist in the db
//   const categoryCount = Categories.find({_id: {$in: document.categories}}).count();
//   if (document.categories.length !== categoryCount) {
//     throw new Error({id: 'categories.invalid'});
//   }
//   return document;
// }