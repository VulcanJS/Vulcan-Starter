# VulcanJS starter repo. Use as a base for your own VulcanJS projects.

## Steps to install

These steps were tested Oct 15/2017, on an 8Gb Qemu/KVM virtual machine running Xubuntu Desktop 16.04 LTS.
Expect other environments to behave differently but, sufficiently similar that, adaptation should not be difficult.

### Step 1 - Preparation

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

### Step 2 - Test Vulcan installation

 Check it works with a browser at http://localhost:3033
 then kill it with &lt;ctrl-c>

    # Run Vulcan so it pre-caches all its Meteor dependencies
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor  --port 3033 --settings settings.json;


### Step 3 - Prepare your project

    # Name your new Vulcan project
    export PROJ_NAME="myvulcanproject";

    # Clone Vulcan starter kit as your named project
    git clone git@github.com:VulcanJS/Vulcan-Starter.git ${PROJ_NAME}

    # Step in your project folder
    cd ../${PROJ_NAME};

    # Make sure your app uses the same Meteor release as Vulcan
    cp ../Vulcan/.meteor/release ./.meteor

    # install and pre-cache all of your named app's NodeJS dependencies
    meteor npm install

    # Tell Meteor to refer to the Vulcan sister folder for packages that Vulcan supplies
    export METEOR_PACKAGE_DIRS=../Vulcan/packages;
    echo "Vulcan's Meteor packages folder : ${METEOR_PACKAGE_DIRS}.";

### Step 2 - Test your project installation

 Check it works with a browser at http://localhost:3000
 then kill it with &lt;ctrl-c>

    # Run your Vulcan project
    [ -f settings.json ] || cp sample_settings.json settings.json;
    meteor --port 3000 --settings settings.json

