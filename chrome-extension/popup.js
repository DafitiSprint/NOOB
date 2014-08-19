chrome.runtime.sendMessage({from: "popup", message: "list-alerts"}, function(m){
    console.log(m);
    document.getElementById('messages').textContent = request.message.split("<br>");
});