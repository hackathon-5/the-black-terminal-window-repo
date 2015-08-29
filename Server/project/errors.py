from flask import jsonify
from . import db
from werkzeug.exceptions import HTTPException
def handle_error(error):

    db.session.rollback()

    if isinstance(error, HTTPException):
        code = error.code
        error_type = error.__class__.__name__
        message = error.description
    else:
        code = 500
        error_type = 'server_error'
        message = 'A server error occurred.'

    rv = {
        'status': 'error',
        'type': error_type,
        'message': message
    }

    response = jsonify(rv)
    response.status_code = code