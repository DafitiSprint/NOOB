console.log('loaded');

var ws = new WebSocket('ws://localhost:8888');
ws.onmessage = function(m){
  chrome.runtime.sendMessage('alert', m);
  console.log(m);
  NOOB.addMessage(m.data);
}

var NOOB = {
  messages: [],
  getMessages: function() {
    return this.messages;
  },
  addMessage: function(message) {
    this.messages.push(message);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message == 'list-messages'){
    sendResponse({
      from: "background",
      message: NOOB.getMessages()
    });
    chrome.runtime.sendMessage({
      from: "background",
      message: NOOB.getMessages()
    });
  }
});