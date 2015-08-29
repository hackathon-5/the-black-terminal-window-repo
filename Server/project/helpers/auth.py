import os
import hashlib
import arrow
import datetime as dt
from .. import db
from flask import g, request, json, abort, jsonify, make_response
from ..models import AuthorizationTokens


def generate_token():
    return hashlib.sha256(os.urandom(64)).hexdigest()


class AccessToken(object):
    def __init__(self, input_info=None, **kwargs):
        if input_info:
            for k, v in input_info.items():
                setattr(self, k, v)
        else:
            for k, v in kwargs.items():
                setattr(self, k, v)

        if not hasattr(self, 'auth_token') or not hasattr(self, 'auth_secret'):
            self.auth_token = generate_token()
            self.auth_secret = generate_token()

    def save(self):
        key = 'auth_token:{}'.format(self.auth_token)
        new_token = AuthorizationTokens(auth_token=key)
        db.session.add(new_token)
        db.session.commit()

    @classmethod
    def loads_from_json(cls, json_string):
        data = json.loads(json_string)
        return AccessToken(data)


def generate_user():
    if not request.headers.get('Authorization'):
        g.teacher_id = None
        return
    token_key = 'auth_token:{}'.format(request.headers.get('Authorization'))

    token = AuthorizationTokens.query.filter_by(auth_token=token_key).first().auth_token

    if not token:
        g.teacher_id = None
        return

    else:
        parsed_token = AccessToken.loads_from_json(token)
        if parsed_token.expiration_time <= arrow.utcnow().timestamp:
            g.teacher_id = None
            return
        g.auth_token = parsed_token.auth_token
        g.teacher_id = parsed_token.teacher_id


def require_auth():
    if not g.teacher_id:
        abort(403)


def renew_token():
    token_key = 'auth_token:{}'.format(request.headers.get('Authorization'))

    token = AuthorizationTokens.query.filter_by(auth_token=token_key).first().auth_token

    parsed_token = AccessToken.loads_from_json(token)

    new_token = AccessToken(teacher_id=parsed_token.teacher_id, expiration_time=arrow.utcnow().replace(minute=15).timestamp)
    new_token.save()
    db.session.add(new_token)
    db.session.commit()

    return jsonify(auth_token=new_token.auth_token,
                   auth_secrete=new_token.auth_secret)

def add_cors_headers(response):
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Authorization, '
                                        'Origin, Content-Type, Accept'
    }

    for k, v in cors_headers.items():
        response.headers[k] = v

    return response


def respond_to_options():
    if request.method == 'OPTIONS':
        rv = make_response()
        rv = add_cors_headers(rv)
        return rv