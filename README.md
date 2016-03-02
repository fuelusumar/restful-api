# restful-api
A basic but complete implementation of a RESTful API

## Installation Process

### Development Environment
It's the set of processes and programming tools used to create the program or software product. The term may sometimes also imply the physical environment. This installation takes course in an Ubuntu 15.10 x64 laptop computer.
- **Memory:** 5.7 GiB
- **Processor:** Intel® Core™ i5-3337U CPU @ 1.80GHz × 4 
- **Graphics:** GeForce GT 630M/PCIe/SSE2
- **OS Type:** 64-bit
- **Disk:** 116.3 GB
But this is a lot higher than the minimun requirements.
About the text editor or IDE, i use SublimeText 3, available in [sublime].

#### Uninstall what may cause conflict
nodejs and npm packages are way out of date in the ubuntu repository, so lets uninstall them just in case, so we won't have any conflict in the future.

##### Uninstall Commands
Let's uninstall nodejs and npm:
```bash
:~$ sudo apt-get -y --purge remove nodejs npm
:~$ sudo apt-get autoremove -y
```

#### NodeJS Installation

##### Debian and Ubuntu based Linux distributions
Node.js is available from the NodeSource Debian and Ubuntu binary distributions repository (formerly Chris Lea's Launchpad PPA). Support for this repository, along with its scripts, can be found on GitHub at nodesource/distributions.
```bash
:~$ sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
:~$ sudo apt-get install -y nodejs
:~$ sudo npm update -g # run this until no response from the terminal
```

##### Install build tools (optional)
To compile and install native addons from npm you may also need to install build tools:
```bash
:~$ sudo apt-get install -y build-essential
```

##### Install global packages
```bash
:~$ sudo npm install -g apidoc flightplan forever gulp jshint mocha nodemon
```

##### Check versions
```bash
:~$ nodejs --version
-> v4.3.1
:~$ npm --version
-> 3.8.0
```

#### Run Project (after installing MongoDB as in [MongoDB Installation](#mongodb-installation))
First, go to the projetc's folder, then run:
```bash
:~$ npm install
:~$ gulp apidoc
:~$ gulp nodemon
```
And you'll have a server running in https://localhost:3000 waitong for you!

### Testing Environment
It's function is to deliver a a software that is validated, stable and usable to execute the test scenarios or replicate bugs. This installation takes course in an Ubuntu 14.04.3 x64 server instance located in DigitalOcean cloud hosting.
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
:~$ sudo apt-get install -y nodejs npm
```

##### Install build tools (optional)
To compile and install native addons from npm you may also need to install build tools:
```bash
:~$ sudo apt-get install -y build-essential
```

##### Install global packages
```bash
:~$ sudo npm install -g apidoc flightplan forever gulp jshint mocha nodemon
```

#### Nginx Installation

##### Install Nginx
We can install Nginx easily because the Ubuntu team provides an Nginx package in its default repositories.
```bash
:~$ sudo apt-get update
:~$ sudo apt-get install -y nginx
```

##### Config Server
Create the file `sudo nano /etc/nginx/conf.d/servers.conf` and add the configuration for our server. Our server will be running in the 3000 port, so we need to configure our nginx server as a proxy.
```bash
:~$ sudo nano /etc/nginx/conf.d/servers.conf
```
And add our configuration:
```bash
server {
    listen 80;
    server_name our.domain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 3000;
        proxy_send_timeout 3000;
        proxy_read_timeout 3000;
        proxy_buffers 4 32k;
        client_max_body_size 8m;
        client_body_buffer_size 128k;
    }
}
```
Finally restart the nginx server:
```bash
:~$ sudo service nginx restart
```

### Testing Deployment

#### Server Side
First of all we have to configure our server, SSH protocol, SSH key, a local user and a remote user. Then we can use flightplan:
```bash
:~$ fly setup:testing # just the first time
-> # Check there are no errors
:~$ fly build:testing # once you res sure there are no problems in the app
-> # Check there are no errors
:~$ fly deploy:testing
-> # Check there are no errors
```
  [sublime]: <https://www.sublimetext.com/3>