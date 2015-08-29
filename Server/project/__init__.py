import logging
import sys
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)



log = "%(levelname)s\t[%(asctime)s]\t[%(module)s:%(funcName)s:%(lineno)d]: %(message)s"
formatter = logging.Formatter(log)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(formatter)

app.logger.addHandler(handler)
app.logger.setLevel(logging.DEBUG)
app.logger.info('Logging has been configured.')

from .helpers.auth import generate_user
app.before_request(generate_user)

from .handlers.login import login_bp
app.register_blueprint(login_bp)


db.create_all()
