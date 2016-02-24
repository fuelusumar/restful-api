# restful-api
A basic but complete implementation of a RESTful API

## Installation Progress

### Development Environment

### Testing Environment
Its function is to deliver a a software that is validated, stable and usable to execute the test scenarios or replicate bugs. This installation takes course in an Ubuntu 14.04.3 x64 server instance located in DigitalOcean cloud hosting.
This guide is for a node.js API server, using express.js and mongodb as database server. 

#### MongoDB Installation

##### Import the public key
Import the public key used by the package management system
The Ubuntu package management tools (i.e. dpkg and apt) ensure package consistency and authenticity by requiring that distributors sign packages with GPG keys.
```bash
:~$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 
```

##### Create a list file for MongoDB
Create the `/etc/apt/sources.list.d/mongodb-org-3.2.list` list file using the command appropriate for your version of Ubuntu:
```bash
:~$ sudo nano /etc/apt/sources.list.d/mongodb-org-3.2.list
```

##### Edit the file
Write this in it:
```bash
deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse
```

##### Reload local package database
Issue the following command to reload the local package database:
```bash
:~$ sudo apt-get update
```

##### Install the MongoDB packages
You can install the latest stable version of MongoDB. Issue the following command:
```bash
:~$ sudo apt-get install -y mongodb-org
```

##### Check Version
Run this command:
```bash
:~$ mongo --version
-> MongoDB shell version: 3.2.3
```

##### Possible errors
One of the possible errors that might be found is with the global initialization.
```bash
Failed global initialization: BadValue Invalid or no user locale set. Please ensure LANG and/or LC_* environment variables are set correctly.
```

##### How to fix it?
For temporary fix, just run:
```bash
:~$ sudo export LC_ALL=C
```
or
```bash
:~$ sudo locale-gen "en_US.UTF-8"
```
For a more permanent approach, edit the `/etc/environment` file and add this in it:
```bash
LC_ALL=C
LANG=en_US.UTF-8
```

#### NodeJS Installation

##### Debian and Ubuntu based Linux distributions
Node.js is available from the NodeSource Debian and Ubuntu binary distributions repository (formerly Chris Lea's Launchpad PPA). Support for this repository, along with its scripts, can be found on GitHub at nodesource/distributions.
```bash
:~$ sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
:~$ sudo apt-get install -y nodejs
```

##### Install build tools (optional)
To compile and install native addons from npm you may also need to install build tools:
```bash
sudo apt-get install -y build-essential
```