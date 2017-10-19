#! /usr/bin/env node
const utils = require('./utils.js');
const LG = console.log;

const installChrome = () => {

  utils.installUtility('curl');
  utils.installUtility('libxss1');
  utils.installUtility('fonts-liberation');

  const pkgChrome = `google-chrome-stable`;
  const chrome_installer = `${pkgChrome}_current_${utils.getCpuArchitecture()}.deb`;
  const google_downloads = `https://dl.google.com/linux/direct`;

  utils.installPackage(
    pkgChrome,
    chrome_installer,
    google_downloads
  );

};

if (!module.parent) {
  utils.runAsRoot( installChrome );
}

module.exports = installChrome;
