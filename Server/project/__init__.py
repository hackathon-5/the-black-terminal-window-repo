from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app.config['SQLALCHMEY_DATABASE_URI'])

db.create_all()
