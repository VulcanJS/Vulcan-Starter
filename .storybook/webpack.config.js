/*

Modify

*/

const path = require('path');
/**
 * Smart function to find Vulcan packages
 * 
 * You can either provide a path to Vulcan as VULCAN_DIR env
 * or set the METEOR_PACKAGE_DIR variable
 */
const findPathToVulcanPackages = () => {
  // look for VULCAN_DIR env variable
  if (process.env.VULCAN_DIR) return `${process.env.VULCAN_DIR}/packages`
  // look for METEOR_PACKAGE_DIRS variable
  const rawPackageDirs = process.env.METEOR_PACKAGE_DIRS
  if (rawPackageDirs) {
    const dirs = rawPackageDirs.split(':')
    // Vulcan dir should be '/some-folder/Vulcan/packages'
    const vulcanPackagesDir = dirs.find((dir) => !!dir.match(/\/Vulcan\//))
    if (vulcanPackagesDir) {
      return vulcanPackagesDir
    }
    console.log(`
      Please either set the VULCAN_DIR variable to your Vulcan folder or
      set METEOR_PACKAGE_DIRS to your <Vulcan>/packages folder.
      Fallback to default value: '../../Vulcan'.`
    )
  }
  // default value
  return '../../Vulcan/packages'
}
// path to your Vulcan repo (see 2-repo install in docs)
const pathToVulcanPackages = path.resolve(__dirname, findPathToVulcanPackages());

// path to your Vulcan UI library package
const pathToUILibrary = `${pathToVulcanPackages}/vulcan-ui-bootstrap`;

/*

Do Not Modify

*/

module.exports = ({ config }) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,

      // Components
      CoreComponentsLoader: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-core/lib/modules/components.js`),
      UIComponentsLoader: path.resolve(__dirname, `${pathToUILibrary}/lib/modules/components.js`),
      UILibrary: path.resolve(__dirname, pathToUILibrary),

      // Locales
      EnUS: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-i18n-en-us/lib/en_US.js`),
      EsES: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-i18n-es-es/lib/es_ES.js`),
      FrFR: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-i18n-fr-fr/lib/fr_FR.js`),

      // Vulcan Packages
      'meteor/vulcan:lib': path.resolve(__dirname, './helpers.js'),
      'meteor/vulcan:core': path.resolve(__dirname, './helpers.js'),
      'meteor/vulcan:events': path.resolve(__dirname, './helpers.js'),
      'meteor/vulcan:users': path.resolve(__dirname, './helpers.js'),
      'meteor/vulcan:i18n': 'react-intl',
      'meteor/vulcan:users': path.resolve(__dirname, './helpers')
    },
  };

  /*

  Parse JSX files outside of Storybook directory

  */
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    loaders: [
  /*    {
        loader: path.resolve(__dirname, './loaders/vulcan-loader'),
        options: {
          vulcanPackagesDir: pathToVulcanPackages
        },
      },
      {
        loader: path.resolve(__dirname, './loaders/scrap-meteor-loader'),
      },
      */
      {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }],
        }
      }],
  });

  /*

  Parse SCSS files

  */
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    // include: path.resolve(__dirname, "../")
  });

  // Return the altered config
  return config;
};
