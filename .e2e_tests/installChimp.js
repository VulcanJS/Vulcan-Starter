#! /usr/bin/env node

const GitHub = require('github-api');

// const env = require('shelljs').env;
// const exec = require('shelljs').exec;
// const echo = require('shelljs').echo;
const utils = require('../.scripts/utils.js');
const installChrome = require('../.scripts/installChrome.js');

const LG = console.log;

const minimumVersion = '6.0.0';

const installChimp = () => {

  if ( ! utils.adequateNodeVersion( minimumVersion ) ) {
    LG(`     Chimp will not install with NodeJs version '${process.version}'.
       Please use 'nvm' to run NodeJs version '${minimumVersion}' or greater.
       (Note that this is your system NodeJs version, not the one Vulcan is using.)`);
    process.exit(1);
  }

  installChrome();

  new GitHub()
    .getRepo('xolvio', 'chimp')
    .listTags()
    .then( ( tagData ) => {
      chimpVersion = tagData.data[2].name;
      var spec = { package: `chimp`, isGlobal: true };
      utils.installNodePackage( spec, ( res ) => {
        LG(`Installed Chimp version : '${chimpVersion}'`);
      });

  })
  .catch( (error) => { LG( `Error while getting Chimp version :: ${error.message}`); });


};

if (!module.parent) {
  installChimp();
}

module.exports = installChimp;
