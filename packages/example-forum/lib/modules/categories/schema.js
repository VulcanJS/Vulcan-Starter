/*

Categories schema

*/

import { Utils } from 'meteor/vulcan:core';

export function getCategoriesAsOptions (categories) {
  // give the form component (here: checkboxgroup) exploitable data
  return categories.map(category => ({
    value: category._id,
    label: category.name,
    // slug: category.slug, // note: it may be used to look up from prefilled props
  }));
}

export function getCategoriesAsNestedOptions (categories) {
  // give the form component (here: checkboxgroup) exploitable data
  const formattedCategories = categories.map(function (category) {
    return {
      value: category._id,
      label: category.name,
      parentId: category.parentId,
      _id: category._id
      // slug: category.slug, // note: it may be used to look up from prefilled props
    };
  });
  const nestedCategories = Utils.unflatten(formattedCategories, {idProperty: '_id', parentIdProperty: 'parentId', childrenProperty: 'options'});
  return nestedCategories;
}

// category schema
const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  description: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    inputProperties: {
      rows: 3
    }
  },
  order: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    onCreate: ({newDocument: category}) => {
      // if no slug has been provided, generate one
      const slug = category.slug || Utils.slugify(category.name);
      return Utils.getUnusedSlugByCollectionName('Categories', slug);
    },
    onUpdate: ({data, document: category}) => {
      // if slug is changing
      if (data.slug && data.slug !== category.slug) {
        const slug = data.slug;
        return Utils.getUnusedSlugByCollectionName('Categories', slug);
      }
    }
  },
  image: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  parentId: {
    type: String,
    optional: true,
    input: "select",
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    resolveAs: {
      fieldName: 'parent',
      type: 'Category',
      resolver: async (category, args, {currentUser, Users, Categories}) => {
        if (!category.parentId) return null;
        const parent = await Categories.loader.load(category.parentId);
        return Users.restrictViewableFields(currentUser, Categories, parent);
      },
      addOriginalField: true
    },
    options: props => {
      return getCategoriesAsOptions(props.data.categories.results);
    },
    query: `
      categories{
        results{
          _id
          name
          slug
          order
        }
      }
    `,
  }
};

export default schema;
