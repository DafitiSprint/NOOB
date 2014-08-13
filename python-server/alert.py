import tornado.web
from websocket import WebSocketHandler

class AlertHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    def get(self):
        WebSocketHandler.broadcast('apitar')
        #WebSocketHandler.broadcast(options.port, 'hey')
        self.write("Alertado")
        self.finish()