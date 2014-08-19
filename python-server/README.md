NOOB - Python Server
====

By default the server is started at port 80
You can change the port on the server start as follow

```sh
python NOOB.py --port=8383
```

This is a Web and WebSocket server.
To connect a WebSocket client to this server, you must connect to /ws and pass an integer named Id as param:

```sh
host:PORT/ws?Id=123
```