// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const shell = require('shelljs')
require('cross-fetch/polyfill');

const defaultPackages = 'https://raw.githubusercontent.com/VulcanJS/Vulcan-Starter/devel/.meteor/packages'

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {

    'saveUserMeteorPackages': () => {
      shell.mv('.meteor/packages', '.meteor/packages_bak')
      return null;
    },

    'restoreUserMeteorPackages': () => {
      shell.mv('.meteor/packages_bak', '.meteor/packages')
      return null;
    },

    'useDefaultMeteorPackages': (packageName) => {
      return (async () => {
        try {
          const res = await fetch(defaultPackages);
          const text = await res.text()
          shell.echo(text).to('.meteor/packages')
          return true
        } catch (err) {
          console.error(err);
          return err
        }
      })();
    }
  });
}
