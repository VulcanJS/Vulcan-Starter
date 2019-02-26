/*

Modify

*/

// path to your Vulcan repo (see 2-repo install in docs)
const pathToVulcan = '../../Vulcan';

// path to your Vulcan UI library package
const pathToUILibrary = `${pathToVulcan}/packages/vulcan-ui-bootstrap`; 

/*

Do Not Modify

*/
const path = require('path');

module.exports = storybookBaseConfig => {
  storybookBaseConfig.resolve = {
    ...storybookBaseConfig.resolve,
    alias: {
      ...storybookBaseConfig.resolve.alias,

      // Components
      CoreComponentsLoader: path.resolve(__dirname, `${pathToVulcan}/packages/vulcan-core/lib/modules/components.js`),
      UIComponentsLoader: path.resolve(__dirname, `${pathToUILibrary}/lib/modules/components.js`),
      UILibrary: path.resolve(__dirname, pathToUILibrary),
      
      // Locales
      EnUS: path.resolve(__dirname, `${pathToVulcan}/packages/vulcan-i18n-en-us/lib/en_US.js`),
      EsES: path.resolve(__dirname, `${pathToVulcan}/packages/vulcan-i18n-es-es/lib/es_ES.js`),
      FrFR: path.resolve(__dirname, `${pathToVulcan}/packages/vulcan-i18n-fr-fr/lib/fr_FR.js`),
      
      // Vulcan Packages
      'meteor/vulcan:lib': path.resolve(__dirname, './helpers.js'),
      'meteor/vulcan:core': path.resolve(__dirname, './helpers.js'),
      'meteor/vulcan:i18n': 'react-intl',
    },
  };

  /*

  Parse JSX files outside of Storybook directory

  */
  storybookBaseConfig.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    query: {
      presets: ['@babel/react', {
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }],
    },
  });

  /*

  Parse SCSS files

  */
  storybookBaseConfig.module.rules.push({
    test: /\.(css|scss)$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    // include: path.resolve(__dirname, "../")
  });

  // Return the altered config
  return storybookBaseConfig;
};
