import os
import hashlib
import datetime as dt
from .. import db
from flask import g, request, json, abort
from ..models import AuthorizationTokens


def generate_token():
    return hashlib.sha256(os.urandom(64).hexdigest())


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
        new_token = AuthorizationTokens(key=key)
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

    token = AuthorizationTokens.query.filter_by(key=token_key).first()

    if not token:
        g.teacher_id = None
        return

    else:
        parsed_token = AccessToken.loads_from_json(token)
        # if parsed_token.experation_time <= dt.datetime.utcnow():
        #     g.teacher_id = None
        #     return
        g.auth_token = parsed_token.auth_token
        g.teacher_id = parsed_token.teacher_id
        # new_token = AccessToken(teacher_id=parsed_token.teacher_id,
        #                         expires_time=dt.datetime.utcnow().replace(minute=15).utcfromtimestamp())

def require_auth():
    if not g.teacher_id:
        abort(403)


