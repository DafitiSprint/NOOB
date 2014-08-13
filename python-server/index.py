import tornado.web

class IndexHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    def get(self):
        self.write("<a href='/alert' target='_blank'>Alertar!</a>")
        self.finish()