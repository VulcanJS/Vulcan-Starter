const { getOptions } = require('loader-utils');
//import path from 'path'

// import lib/client/main.js file
// OR import api.mainModule(...)
module.exports = function loader(source) {
    const options = getOptions(this)
    const { vulcanPackagesDir } = options
    // import 'meteor/vulcan:foobar'
    // => import '/home/john-doe/Vulcan/packages/vulcan-foobar'
    const result = source.replace(
        /meteor\/vulcan:/g,
        `${vulcanPackagesDir}/vulcan-`
    )
    return result
}