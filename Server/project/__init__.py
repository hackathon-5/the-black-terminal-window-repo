from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app.config['SQLALCHMEY_DATABASE_URI'])

from .helpers.auth import generate_user
app.before_request(generate_user())

from .handlers.login import login_bp
app.register_blueprint(login_bp)


db.create_all()
