/**
 * 
 * Load the local packages, inspired by vulcan-loader
 * 
 */
const { getOptions } = require('loader-utils');
module.exports = function loader(source) {
    const options = getOptions(this)
    const {  packagesDir, environment = 'client' } = options

    const prefix = `${packagesDir}/example-`
    const defaultPath = `/lib/${environment}/main.js`

    const result = source.replace(
        // .+?(?=something) matches every char until "something" is met, excluding something
        // we use it to matche the package name, until we meet a ' or "
        // will match meteor/example-{packageName}{/some-optional-import-path}
        /meteor\/example-(.*?(?=\/|'|"))(.*?(?=\'|\"))/g, // match Meteor packages that are lfg packages, + the import path (without the quotes)
        (match, packageName, importPath) => {
            console.log("Found Starter example package", packageName)
            if (importPath){
                return `${prefix}${packageName}${importPath}`
            }
            return `${prefix}${packageName}${defaultPath}`
        }
    )
    return result
}