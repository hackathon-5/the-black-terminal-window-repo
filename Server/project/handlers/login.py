import arrow
from flask import Blueprint, jsonify, request, g, abort
from ..models import Teacher
from ..helpers.auth import AccessToken
from .. import db
login_bp = Blueprint('login', __name__, url_prefix='/login')


@login_bp.route('/', methods=['POST', 'OPTIONS'])
def login():
    if not request.json.get('username'):
        abort(401)

    if not request.json.get('password'):
        abort(401)
    username = request.json.get('username')

    teacher = Teacher.query.filter_by(username=username).first()

    if not teacher:
        abort(401)

    if not teacher.check_password(request.json.get('password')):
        abort(401)

    token = AccessToken(teacher_id=teacher.id, expiration_time=arrow.utcnow().replace(minute=15).timestamp)

    token.save()

    g.teacher_id = teacher.id
    g.auth_token = token.auth_token

    return jsonify(teacher=teacher.username,
                   auth_token=token.auth_token,
                   auth_secrete=token.auth_secret)


@login_bp.route('/new', methods=['POST'])
def new_teacher():
    if not request.json.get('username') or not request.json.get('password'):
        abort(400)

    # if Teacher.query.filter_by(username=request.json.get('username')):
    #     abort(400)

    teacher = Teacher(username=request.json.get('username'), password=request.json.get('password'))
    db.session.add(teacher)
    db.session.commit()

    token = AccessToken(teacher_id=teacher.id, expiration_time=arrow.utcnow().replace(minute=15).timestamp)
    token.save()

    g.teacher_id = teacher.id
    g.auth_token = token.auth_token

    return jsonify(teacher=teacher.username,
                   auth_token=token.auth_token,
                   auth_secrete=token.auth_secret)