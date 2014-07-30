NOOB
====

Notification Bot. Arduino Controlled Notification System.

Installation
--------------
### Requirements
- Arduino Compatible board
- Ethernet Shield
- Node.js

```sh
git clone https://github.com/DafitiSprint/NOOB.git
cd NOOB/App
npm install
node app
```

#### More instructions in following README.md files
- arduino/README.md
- webserver/README.md

#### Arduino
The arduino directory contains the files that must be compiled into an arduino

#### Webserver
The server directory contains the nodejs project that will be the webserver to send notifications to all clients (arduinos, TVs, etc.) connected thru websocket