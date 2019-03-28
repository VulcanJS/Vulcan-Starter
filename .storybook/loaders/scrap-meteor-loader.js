/**
 * Scrap out all meteor imports
 * @param {*} source 
 */
module.exports = function loader(source) {
    // remove line containing "meteor/" that is not a vulcan package
    // NOTE: must be applied AFTER vulcan import are handled
    return source.replace(/^.*meteor\/(?!vulcan).*$/mg, '')
}