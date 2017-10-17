# VulcanJS Starter Kit.

This kit gives you all you need to quickly launch your own VulcanJS projects.

## Installation Overview

If you already have Vulcan up & running then use the *Quick Install* version.
The *Complete Install* steps will get you going on a freshly built Ubuntu desktop machine.

### Quick Install

These steps assume an environment where you have already had Vulcan working.

#### Step 1 - Preparation

Edit these three shell variables to declare installation locations ...

    # Specify where things should go
    export NEW_PROJECT_NAME="";   # a name for your new project
    export PROJECTS_DIRECTORY=""; # the installation path for your new project
    export VULCAN_HOME="";        # the path to the root of your Vulcan installation

Go get the starter kit ...

    # Clone Vulcan starter kit as your named project
    cd ${PROJECTS_DIRECTORY};
    git clone git@github.com:VulcanJS/Vulcan-Starter.git ${NEW_PROJECT_NAME}

Initialize it ...

    # Install and pre-cache all of your named app's NodeJS dependencies
    cd ${NEW_PROJECT_NAME};
    meteor npm install

Establish a link from your starter kit to Vulcan's packages ...

    # Tell Meteor to refer to Vulcan for the packages that it supplies
    export METEOR_PACKAGE_DIRS=${VULCAN_HOME}/packages;
    echo "Vulcan's Meteor packages folder : ${METEOR_PACKAGE_DIRS}.";

#### Step 2 - Running

Do the following, then check it works with a browser at http://localhost:3000 ...

    # Run your Vulcan project
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor --port 3000 --settings settings.json

Congrats! You just gained a cornucopia of functionality you no longer have to develop yourself.  You've saved yourself months of work!  Take the rest of the day off!

### Complete Install

The steps below assume a machine that has not previously been used for software development.

They were tested Oct 15/2017, on an 8Gb Qemu/KVM virtual machine running a freshly installed Xubuntu Desktop 16.04 LTS.
Expect other environments to behave differently but, sufficiently similar that, adaptation should not be difficult.

#### Step 1 - Preparation

    # Prepare dependencies
    sudo apt install -y curl;            # Need curl to get the other stuff.
    sudo apt install -y build-essential; # Need C++ build tools for fast bcrypt installation

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
    mkdir -p projects
    cd projects

    # Clone Vulcan core into its own folder and step into it
    git clone git@github.com:VulcanJS/Vulcan.git
    cd Vulcan;

    # install and pre-cache all of Vulcan's NodeJS dependencies
    meteor npm install;

#### Step 2 - Test Vulcan installation

 Check it works with a browser at http://localhost:3033
 then kill it with &lt;ctrl-c>

    # Run Vulcan so it pre-caches all its Meteor dependencies
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor  --port 3033 --settings settings.json;


#### Step 3 - Prepare your project

    cd ~/projects;
    
    # Name your new Vulcan project
    export PROJ_NAME="myvulcanproject";

    # Clone Vulcan starter kit as your named project
    git clone git@github.com:VulcanJS/Vulcan-Starter.git ${PROJ_NAME}

    # Step in your project folder
    cd ${PROJ_NAME};

    # Make sure your app uses the same Meteor release as Vulcan
    cp ../Vulcan/.meteor/release ./.meteor

    # install and pre-cache all of your named app's NodeJS dependencies
    meteor npm install

    # Tell Meteor to refer to the Vulcan sister folder for packages that Vulcan supplies
    export METEOR_PACKAGE_DIRS=../Vulcan/packages;
    echo "Vulcan's Meteor packages folder : ${METEOR_PACKAGE_DIRS}.";

#### Step 4 - Test your project installation

 Check it works with a browser at http://localhost:3000
 then kill it with &lt;ctrl-c>

    # Run your Vulcan project
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor --port 3000 --settings settings.json

