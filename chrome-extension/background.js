console.log('loaded');

var ws = new WebSocket('ws://localhost:8888');
ws.onmessage = function(m){
  chrome.runtime.sendMessage('alert', m);
  console.log(m);
  NOOB.addMessage(m.data);
  NOOB.notification(m.data);
}

var NOOB = {
  messages: [],
  getMessages: function() {
    return this.messages;
  },
  addMessage: function(message) {
    this.messages.push(message);
  },
  notification: function(message) {
    chrome.notifications.create('', {
      "type": "basic",
      "iconUrl":"noob_dft_icon_red.png",
      "title": "Dafiti Alert",
      "message": message
    }, function (e){ console.log(e) });
    this.setIcon('red');
  },
  setIcon: function(color) {
    chrome.browserAction.setIcon({path: 'noob_dft_icon_'+color+'.png'})
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if(request.message == 'list-alerts'){
    sendResponse({
      from: "background",
      message: NOOB.getMessages()
    });
  }
});