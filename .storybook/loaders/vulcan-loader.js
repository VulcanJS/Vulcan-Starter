/**
 * POC: this loader will treat Vulcan packages
 * as usual npm packages
 */
const { getOptions } = require('loader-utils');
module.exports = function loader(source) {
    const options = getOptions(this)
    const { vulcanPackagesDir } = options
    const result = source.replace(
        /meteor\/vulcan:/g,
        `${vulcanPackagesDir}/vulcan-`
    )
    return result
}