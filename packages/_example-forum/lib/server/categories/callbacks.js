/*


Callbacks to validate categories and generate category slugs

*/

import { Categories } from '../../modules/categories/collection.js';

// make sure all categories in the post.categories array exist in the db
const checkCategories = function (post) {
  // if there are no categories, stop here
  if (!post.categories || post.categories.length === 0) {
    return;
  }
  // check how many of the categories given also exist in the db
  const categoryCount = Categories.find({_id: {$in: post.categories}}).count();
  if (post.categories.length !== categoryCount) {
    throw new Error({id: 'categories.invalid'});
  }
};

export function checkCategories ({ document }) {
  checkCategories(document);
  return document;
}