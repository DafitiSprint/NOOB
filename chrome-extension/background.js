'use strict';

var NOOB = {

  messages: [],
  isConnected: false,

  getMessages: function() {
    return this.messages;
  },

  addMessage: function(message) {
    this.messages.push(message);
  },

  notification: function(message, color) {
    color = (color) ? color : 'red';
    chrome.notifications.create('', {
      "type": "basic",
      "iconUrl":"noob_dft_icon_" + color + ".png",
      "title": "Dafiti Alert",
      "message": message
    }, this.notified);
  },

  notified: function(e) {

  },

  setIcon: function(color) {
      console.log(color);
    chrome.browserAction.setIcon({path: 'noob_dft_icon_'+color+'_32.png'});
  },

  getConnection: function() {
    if (!this.isConnected) {
      this.connect();
    }
    return this.websocketServer;
  },

  connect: function() {
    console.log(this)
    this.websocketServer = new WebSocket('ws://'+localStorage.getItem('websocket_server'));
    this.websocketServer.onopen = this.onopen;
    this.websocketServer.onmessage = this.onmessage;
    this.websocketServer.onclose = this.onclose;
  },

  onopen: function() {
    NOOB.isConnected = true;
    NOOB.setIcon.apply(NOOB, ['green']);
  },

  onmessage: function(m){
    chrome.runtime.sendMessage('alert', m);
    NOOB.addMessage.apply(NOOB, [m.data]);
    NOOB.notification.apply(NOOB, [m.data]);
  },

  onclose: function(){
    NOOB.notification.apply(NOOB, ['Notification Server is Down\nClick the icon to connect or wait 1 hour', 'yellow']);
    NOOB.isConnected = false;
    NOOB.setIcon.apply(NOOB, ['red']);
    setTimeout(function(){
      NOOB.connect.call(NOOB);
    }, 3600000);
  }

}

chrome.browserAction.onClicked.addListener(function(tab) {
  NOOB.getConnection();
});

NOOB.getConnection();