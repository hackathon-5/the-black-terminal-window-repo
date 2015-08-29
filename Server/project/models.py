import bcrypt
from flask import Flask
from sqlalchemy.ext.hybrid import hybrid_property
from project import db

class Teacher(db.Model):
    username = db.Column(db.String, nullable=False, unique=True)

    @hybrid_property
    def password(self):
        return self.password

    @password.setter
    def password(self, value):
        self.password = bcrypt.hashpw(value, bcrypt.gensalt())


class Tokens(db.Model):
    teacher_id = db.Column(db.Integer, foregin_keys='teacher.id')
    auth_token = db.Column(db.String, nullable=False)


