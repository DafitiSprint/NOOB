import tornado.web
from websocket import WebSocketHandler

class AlertHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    def get(self):
        WebSocketHandler.broadcast(self.get_argument("time", '1000'))
        self.write("Alertado")
        self.finish()