import os

import sae
import web

urls = (
    '/', 'contract'
)

app_root = os.path.dirname(__file__)
templates_root = os.path.join(app_root, 'templates')
render = web.template.render(templates_root)

class contract:
    def GET(self):
        return render.contract()

app = web.application(urls, globals()).wsgifunc()

application = sae.create_wsgi_app(app)