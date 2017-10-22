# VulcanJS Starter Kit.

This kit gives you all you need to quickly launch your own VulcanJS projects.

## Installation Overview

If you already have Meteor and/or Vulcan up & running then use the *Quick Install* version.

The *Complete Install* steps will get you going on a freshly built Ubuntu desktop machine (including installing Node, Meteor, etc.) using the "[two-repo](http://docs.vulcanjs.org/#Two-Repo-Install)" install.

### Quick Install

These steps assume an environment where you have already had Vulcan working.

#### Step 1 - Clone

```
git clone git@github.com:VulcanJS/Vulcan-Starter.git
cd Vulcan-Starter
```

#### Step 2 – Settings

Copy `sample_settings.json` into a new `settings.json` file. 

#### Step 3 – Run

```
npm install
npm start
```

Congrats! You just gained a cornucopia of functionality you no longer have to develop yourself.  You've saved yourself months of work!  Take the rest of the day off!

### Complete Install

The steps below assume a machine that has not previously been used for software development.

They were tested Oct 15/2017, on an 8Gb Qemu/KVM virtual machine running a freshly installed Xubuntu Desktop 16.04 LTS.
Expect other environments to behave differently but, sufficiently similar that, adaptation should not be difficult.

#### Critical prerequisite

Note that, to use the scripts below, you **must already have** SSH access to GitHub.  You'll need that in any case for properly managing version control of your project.  Learn more at [GiHub Bootcamp : Connecting to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)

#### Step 1 - Preparation

    # Specify where things should go
    export NEW_PROJECT_NAME="myVulcan";                # a name for your new project
    export PROJECTS_DIRECTORY="${HOME}/projects";      # the installation path for your new project
    export VULCAN_HOME="${PROJECTS_DIRECTORY}/Vulcan"; # the path to the root of your Vulcan installation

    # Prepare dependencies
    sudo apt install -y git curl build-essential;
    # Need git for managing your project's source code.
    # Need curl to get the other stuff.
    # Need C++ build tools for fast bcrypt installation

    # Install 'meteor'
    curl https://install.meteor.com/ | sh;

    # Sanity check your Meteor installation
    echo -e "\nMeteor version...";
    meteor --version;
    export METEOR_NODE_VERSION=$(meteor node --version);
    echo -e "Meteor Node version...\n ${METEOR_NODE_VERSION}";


    # Install 'nvm', so as to be able to easily switch NodeJs versions
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash;

    # Prepare to use 'nvm' immediately
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


    # Set Meteor version of Node as your default for NodeJS work outside of Meteor
    nvm install ${METEOR_NODE_VERSION};
    nvm alias default ${METEOR_NODE_VERSION};

    # Create a projects folder and step into it
    mkdir -p ${PROJECTS_DIRECTORY}
    cd ${PROJECTS_DIRECTORY}

    # Clone Vulcan core into its own folder and step into it
    git clone git@github.com:VulcanJS/Vulcan.git

    # install and pre-cache all of Vulcan's NodeJS dependencies
    cd ${VULCAN_HOME};
    meteor npm install;

#### Step 2 - Test Vulcan installation

 Check it works with a browser at http://localhost:3033
 then kill it with &lt;ctrl-c>

    # Run Vulcan so it pre-caches all its Meteor dependencies
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor  --port 3033 --settings settings.json;


#### Step 3 - Prepare your project

    cd ${PROJECTS_DIRECTORY};
    
    # Clone Vulcan starter kit as your named project
    git clone git@github.com:VulcanJS/Vulcan-Starter.git ${NEW_PROJECT_NAME}

    # Step in your project folder
    cd ${NEW_PROJECT_NAME};

    # Make sure your app uses the same Meteor release as Vulcan
    cp ${VULCAN_HOME}/.meteor/release ./.meteor;

    # install and pre-cache all of your named app's NodeJS dependencies
    # meteor npm install --save cross-fetch;
    meteor npm install;

    # Tell Meteor to refer to the Vulcan sister folder for packages that Vulcan supplies
    export METEOR_PACKAGE_DIRS=../Vulcan/packages;
    echo "Vulcan's Meteor packages folder : ${METEOR_PACKAGE_DIRS}.";

#### Step 4 - Test your project installation

 Check it works with a browser at http://localhost:3000
 then kill it with &lt;ctrl-c>

    # Run your Vulcan project
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor --port 3000 --settings settings.json

