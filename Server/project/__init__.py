import logging
import sys
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)



log = "%(levelname)s\t[%(asctime)s]\t[%(module)s:%(funcName)s:%(lineno)d]: %(message)s"
formatter = logging.Formatter(log)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(formatter)

app.logger.addHandler(handler)
app.logger.setLevel(logging.DEBUG)
app.logger.info('Logging has been configured.')

from .config import DevConfig
app.config.from_object(DevConfig)

db = SQLAlchemy(app)

from .helpers.auth import generate_user, respond_to_options, add_cors_headers
app.before_request(respond_to_options)
app.before_request(generate_user)
app.after_request(add_cors_headers)


from .handlers.login import login_bp
from .handlers.student import student_bp
app.register_blueprint(login_bp)
app.register_blueprint(student_bp)

db.create_all()
