import datetime as dt
from flask import Blueprint, jsonify, request, g, abort
from ..models import Teacher
from ..helpers.auth import AccessToken
from .. import db
login_bp = Blueprint('login', __name__, url_prefix='/login')


@login_bp.route('/', methods=['POST'])
def login():
    if not request.json.get('username'):
        abort(403)
    teacher = Teacher.query.filter_by(username=request.json.get('username')).first()

    if not request.json.get('password'):
        abort(403)

    if not teacher.check_password(request.json.get('password')):
        abort(403)

    token = AccessToken(teacher_id=teacher.id, expiration_time=dt.datetime.utcnow().replace(minute=15).utcfromtimestamp())

    token.save()

    g.teacher_id = teacher.id
    g.auth_token = token.auth_token

    return jsonify(teacher=teacher.username,
                   auth_token=token.auth_token,
                   auth_secrete=token.auth_secret)


@login_bp.record('/new', methods=['POST'])
def new_teacher():
    if not request.json.get('username') or not request.json.get('password'):
        abort(400)

    teacher = Teacher(usernamr=request.json.get('username'), password=request.json.get('password'))
    db.session.add(new_teacher)
    db.session.commit()

    token = AccessToken(teacher_id=teacher.id, expiration_time=dt.datetime.utcnow().replace(minute=15).utcfromtimestamp())
    token.save()

    g.teacher_id = teacher.id
    g.auth_token = token.auth_token

    return jsonify(teacher=teacher.username,
                   auth_token=token.auth_token,
                   auth_secrete=token.auth_secret)