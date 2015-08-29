import bcrypt
from flask import Flask
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_property
from project import db


class Base(db.Model):
    __abstract__ = True

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()
    id = db.Column('id', db.Integer, primary_key=True)


class Teacher(Base):
    username = db.Column(db.String, nullable=False, unique=True)
    _password = db.Column(db.String, nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), self._password.encode('utf-8')) == self._password


class AuthorizationTokens(Base):
    key = db.Column(db.String, nullable=False)

class Student(Base):
    grade = db.Column(db.String)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    dob = db.Column(db.String, nullable=False)

class Garudian(Base):
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    relationship = db.Column(db.String, nullable=False)
    pick_up_times = db.Column(db.String, default="Monday Tuesday Wednesday Thursday Friday")

    blacklist = db.Column(db.Boolean, default=False)

class StudentEvents(Base):
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    event = db.Column(db.String, nullable=False)
