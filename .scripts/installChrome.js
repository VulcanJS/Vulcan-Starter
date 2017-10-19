#! /usr/bin/env node
const utils = require('./utils.js');
const LG = console.log;

const installChrome = () => {

  const pkgChrome = `google-chrome-stable`;
  const chrome_installer = `${pkgChrome}_current_${utils.getCpuArchitecture()}.deb`;
  const google_downloads = `https://dl.google.com/linux/direct`;

  utils.installUtility('curl', ( res ) => {
    LG( res );
    utils.installUtility('libxss1', ( res ) => {
      LG( res );
      utils.installUtility('fonts-liberation', ( res ) => {
        LG( res );
        utils.installPackage(
          pkgChrome,
          chrome_installer,
          google_downloads
        );
      });
    });
  });
return;



};

if (!module.parent) {
  utils.runAsRoot( installChrome );
}

module.exports = installChrome;
