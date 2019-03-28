/**
 * Scrap out all meteor imports
 * 
 * Allow to preserve some predefined meteor package
 * @param {*} source 
 */
const { getOptions } = require('loader-utils');
module.exports = function loader(source) {
    const options = getOptions(this)
    const { preserve= [] } = options
    let preservedRegex
    if (preserve.length) {
        preservedRegex = new RegExp(preserve.join('|'))
    }
    // ignore vulcan package
    return source.replace(/^.*meteor\/(?!vulcan).*$/mg, (match) => {
        const isPreserved = preservedRegex && !!match.match(preservedRegex)
        if (isPreserved) {
            return match // ignore excluded packages
        }
        // remove line containing "meteor/" that is not a vulcan package
        return ''
    })
}