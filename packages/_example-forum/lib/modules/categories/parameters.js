/*

Categories parameter

*/

import { addCallback, getSetting, registerSetting } from 'meteor/vulcan:core';
// import gql from 'graphql-tag';
import { Categories } from './collection.js';

registerSetting(
  'forum.categoriesFilter',
  'union',
  'Display posts belonging to all (“intersection”) or at least one of (“union”) the selected categories'
);

// Category Posts Parameters
// Add a 'categories' property to terms which can be used to filter *all* existing Posts views.
function PostsCategoryParameter(parameters, terms, apolloClient) {
  // get category slugs
  const cat = terms.cat || terms['cat[]'];
  const categoriesSlugs = Array.isArray(cat) ? cat : [cat];
  let allCategories = [];

  if (cat && cat.length) {
    // TODO: get categories through GraphQL API using runQuery

    // get all categories
    // note: specify all arguments, see https://github.com/apollographql/apollo-client/issues/2051
    // const query = `
    //   query GetCategories($terms: JSON) {
    //     CategoriesList(terms: $terms, enableCache: $enableCache) {
    //       _id
    //       slug
    //     }
    //   }
    // `;
    // const results = await runQuery(query);
    // allCategories = results.data.CategoriesList;

    // TODO: figure out how to make this async without messing up withList on the client
    allCategories = Categories.find().fetch();

    // get corresponding category ids
    const categoriesIds = allCategories
      .filter(category => categoriesSlugs.includes(category.slug))
      .map(c => c._id);
    const operator =
      getSetting('forum.categoriesFilter', 'union') === 'union'
        ? '$in'
        : '$all';

    // parameters.selector = Meteor.isClient ? {...parameters.selector, 'categories._id': {$in: categoriesIds}} : {...parameters.selector, categories: {[operator]: categoriesIds}};
    parameters.selector = {
      ...parameters.selector,
      categoriesIds: { [operator]: categoriesIds },
    };
  }

  return parameters;
}

addCallback('post.parameters.server', PostsCategoryParameter);
