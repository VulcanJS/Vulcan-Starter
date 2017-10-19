#! /usr/bin/env node

const GitHub = require('github-api');

// const env = require('shelljs').env;
// const exec = require('shelljs').exec;
// const echo = require('shelljs').echo;
const utils = require('../.scripts/utils.js');
const installChrome = require('../.scripts/installChrome.js');

const LG = console.log;

const installChimp = () => {

  LG('***** installing chimp ******');

  installChrome();

  new GitHub()
    .getRepo('xolvio', 'chimp')
    .listTags()
    .then( ( tagData ) => {
      chimpVersion = tagData.data[2].name;
      LG(`Version : ${chimpVersion}`);



      LG(`***** installed chimp *******
  ||-->
   `);
  })
  .catch( (error) => { LG( `Error while getting Chimp version :: ${error.message}`); });


};

if (!module.parent) {
  installChimp();
}

module.exports = installChimp;
