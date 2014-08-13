import tornado.websocket

clients = {}

class WebSocketHandler(tornado.websocket.WebSocketHandler):

    @staticmethod
    def broadcast(message):
        print message
        for client in clients:
            clients[client]["object"].write_message('alert');

    def open(self, *args):
        print "connected"
        self.id = self.get_argument("Id")
        self.stream.set_nodelay(True)
        clients[self.id] = {"id": self.id, "object": self}


    def on_message(self, message):        
        """
        when we receive some message we want some message handler..
        for this example i will just print message to console
        """
        print "Client %s received a message : %s" % (self.id, message)        
        

    def on_close(self):
        if self.id in lients:
            del clients[self.id]