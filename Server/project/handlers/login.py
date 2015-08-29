from flask import Blueprint, jsonify, request, g, abort
from ..models import Teacher
login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/', methods=['POST'])
def login():
    if not request.json.get('username'):
        abort(403)


