/**
 * @summary Get URL of a comment page.
 * @param {Object} comment
 */
export const getPageUrl = function(category, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/category/${category.slug}`;
};