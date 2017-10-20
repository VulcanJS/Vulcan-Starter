#! /usr/bin/env node
const LG=console.log;
const utils = require('./.scripts/utils.js');
const env = require("shelljs").env;
// const exec = require("shelljs").exec;
// const echo = require("shelljs").echo;

// var pkg = `chimp`;
var spec = { package: `chimp`, isGlobal: true };
utils.checkForNodePackage( spec, ( res ) => {
  if ( res != 0 ) {
    const installChimp = require('./.e2e_tests/installChimp.js');
    utils.runAsRoot( installChimp );
  }
});

// LG('<||||| curtailed |||||>');
// return;

