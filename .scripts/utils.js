#! /usr/bin/env node

const env = require('shelljs').env;
const exec = require('shelljs').exec;
const grep = require('shelljs').grep;
const test = require("shelljs").test;

const got = require('got');
const fs = require('fs');

const sudo = require('sudo');
const which = require('which');
const os = require('node.os');
const LG = console.log;

const knownOperatingSystems = [ 'linux', 'android', 'win', 'osx', 'ios', 'browser', 'nw', 'wechat', 'Electron' ];
const supportedOperatingSystems = [ 'linux', 'android' ];
const knownPackageManagers = [ 'apt', 'rpm', 'pacman' ];
const supportedPackageManagers = [ 'apt' ];

const checkForNodePackage = ( spec, callback ) => {

  var globalSwitch = spec.isGlobal  ? ` -g`  : ``;
  var command = `npm ${globalSwitch} list ${spec.package};`;
  exec( command, {silent:true}, (code, stdout, stderr) => {
    callback( code )
  });

};

const thisOS = os.platform;
function UnSupportedOSException(message) {
   this.message = message;
   this.name = 'UnSupportedOSException';
}
const supportedOS = () => {

  if ( supportedOperatingSystems.indexOf(thisOS) < 0 ) {

    throw new UnSupportedOSException('These scripts have never been tested for execution on : ' + thisOS);
  }
  var distribution = exec('lsb_release -i', {silent:true}).stdout.replace('Distributor ID:', '').trim();
  var unSupportedPackageManager = true;
  knownPackageManagers.forEach( ( aManager ) =>
  {
    if ( exec('which ' + aManager, {silent:true}).stdout ) {
      unSupportedPackageManager = false;
    }
  });

  if ( unSupportedPackageManager ) {
    throw new UnSupportedOSException(`Unable to find a suitable package manager for ${distribution}
      Need one of : [${supportedPackageManagers}]`);
  }
  return distribution;
};


const runAsRoot = ( command ) => {

  sudo([ 'ls' ], { cachePassword: true, prompt: `[sudo] password for '${env['USER']}' : `})
  .stdout
  .on('data', (data) => {

    command();

  });
};

const getCpuWidth = () => {
  supportedOS();
  return exec( `lshw -class cpu`, {silent:true} )
          .grep('width')
          .uniq().stdout
          .replace('width: ', '')
          .replace(' bits', '')
          .trim();
};

const getCpuArchitecture = () => {
  supportedOS();
  return getCpuWidth() === '64'  ?  "amd64"  :  "i386";
};

const execDpkg = ( file ) => {
  exec( `sudo dpkg -i ${file};`, {silent:true}, (code, stdout, stderr) => {
    code  ?  LG(`\nExit code: ${code}`) : null;
    stdout  ?  LG(`\nProgram stdout: ${stdout}`) : null;
    stderr  ?  LG(`\nProgram stderr: ${stderr}`) : null;
  });
};

const downloadsDir = `${env['HOME']}/Downloads`;
const installPackage = ( packageName, installerName, sourceUrl ) => {
  switch( supportedOS() ) {
    case "Ubuntu":
      LG(`Check if ${packageName} is installed`);
      if ( exec( `dpkg-query -s '${packageName}';`, {silent:true} ).stdout.indexOf('install ok installed') < 0 ) {
        LG(`Get ${installerName} from ${sourceUrl}`);
        const filepath = `${downloadsDir}/${installerName}`;
        if ( ! test( '-f', filepath ) ) {
          const installer_url = `${sourceUrl}/${installerName}`;
          LG(`Getting installer file : ${installer_url}`);
          got.stream( installer_url )
             .pipe(fs.createWriteStream(filepath))
             .on('finish', () => {
               LG(`* * * Received and executing : ${filepath} * * *  `);
               execDpkg( filepath );
             });
        } else {
          LG(`Already obtained : ${filepath}`);
          execDpkg( filepath );
        }
      } else {
        LG( `Found '${packageName}' already installed` );
      }
      return true;

    default:
      return false;
  }
};

const installUtility = ( utility, callback ) => {

  switch( supportedOS() ) {
    case "Ubuntu":
      if ( exec( `dpkg-query -s ${utility};`, {silent:true} ).stdout.indexOf('install ok installed') < 0 ) {
        exec( `sudo apt-get -y install ${utility}`, {silent:true}, (code, stdout, stderr) => {
          callback( code == 0  ?  `Installed ${utility} succesfully.`  :  `Could not install ${utility}\n${stderr}` );
        } );
      } else {
        callback( `Found ${utility} already installed.` );
      }

    default:
      return false;

  }
};

if (!module.parent) {
  LG(getCpuArchitecture());
}

module.exports = {
  UnSupportedOSException: UnSupportedOSException,
  supportedOS: supportedOS,
  getCpuArchitecture: getCpuArchitecture,
  runAsRoot: runAsRoot,
  installUtility: installUtility,
  checkForNodePackage: checkForNodePackage,
  installPackage: installPackage
}
