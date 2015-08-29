import bcrypt
from flask import Flask
from sqlalchemy.ext.hybrid import hybrid_property
from project import db

class Teacher(db.Model):
    username = db.Column(db.String, nullable=False, unique=True)
    _password = db.Column(db.String, nullable=False)
    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = bcrypt.hashpw(value, bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.hashpw(password, self.password) == self.password

class AuthorizationTokens(db.Model):
    key = db.Column(db.String, nullable=False)


