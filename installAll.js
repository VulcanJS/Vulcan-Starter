#! /usr/bin/env node
const LG=console.log;
const utils = require('./.scripts/utils.js');
const env = require("shelljs").env;
// const exec = require("shelljs").exec;
// const echo = require("shelljs").echo;

const installChimp = require('./.e2e_tests/installChimp.js');
utils.runAsRoot( installChimp );

// LG('<||||| curtailed |||||>');
// return;
