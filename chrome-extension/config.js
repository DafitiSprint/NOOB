function save_options() {
    localStorage.setItem('websocket_server', document.getElementById('websocket_server').value);
}

function restore_options() {
    var websocket_server = localStorage.getItem('websocket_server');

    if (!websocket_server) {
        websocket_server = 'localhost:80';
        localStorage.setItem('websocket_server', websocket_server);
    }

    document.getElementById('websocket_server').value = websocket_server;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);