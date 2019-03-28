/**
 * POC: this loader will treat Vulcan packages
 * as usual npm packages
 * 
 * Transforms:
 * meteor/vulcan:foobar -> /home/yourVulcanInstall/packages/vulcan-foobar/lib/client/main.js
 * meteor/vulcan:foobar/smth.js -> <same>/smth.js
 */
const { getOptions } = require('loader-utils');
module.exports = function loader(source) {
    const options = getOptions(this)
    const { vulcanPackagesDir, exclude = [], environment = 'client' } = options

    const prefix = `${vulcanPackagesDir}/vulcan-`
    const defaultPath = `/lib/${environment}/main.js`

    let excludeRegex
    if (exclude.length) {
        excludeRegex = new RegExp(exclude.join('|'))
    }
    const result = source.replace(
        // .+?(?=something) matches every char until "something" is met, excluding something
        // we use it to matche the package name, until we meet a ' or "
        /meteor\/vulcan:(.*?(?=\/|'|"))(.*?(?=\'|\"))/g, // match Meteor packages that are vulcan packages, + the import path (without the quotes)
        (match, packageName, importPath) => {
            // ignore excluded packages
            if (!!match.match(excludeRegex)){
                return match 
            }
    //        console.log("match", match, "packageName", packageName, "path", importPath)
            if (importPath){
                return `${prefix}${packageName}${importPath}`
            }
            return `${prefix}${packageName}${defaultPath}`
        }
    )
    return result
}