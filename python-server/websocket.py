import tornado.websocket

clients = {}

class WebSocketHandler(tornado.websocket.WebSocketHandler):

    @staticmethod
    def broadcast(message):
        print message
        for client in clients:
            clients[client]["object"].write_message(message);

    def open(self, *args):
        print "connected"
        self.id = self.get_argument("Id", (len(clients) + 1))

        self.stream.set_nodelay(True)
        clients[self.id] = {"id": self.id, "object": self}


    def on_message(self, message):
        """
        when we receive some message we want some message handler..
        for this example i will just print message to console
        """
        print "Client %s received a message : %s" % (self.id, message)


    def on_close(self):
        if self.id in clients:
            del clients[self.id]


    def check_origin(self, origin):
        return True