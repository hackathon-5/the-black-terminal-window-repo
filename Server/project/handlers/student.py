import arrow
from flask import Blueprint, jsonify, request, g, abort
from ..models import Student, Guardian
from ..helpers.auth import require_auth, renew_token
from .. import db

student_bp = Blueprint('student',__name__, url_prefix='/student')
# student_bp.before_request(require_auth)
# student_bp.after_request(renew_token())


@student_bp.route('/list', methods=['GET'])
def get_students():
    students = Student.query.all()

    json_dict = {'student':
                     {'id': student.id,
                      'first_name': student.first_name,
                      'last_name': student.last_name,
                      'image': student.image} for student in students}

    return jsonify(students=json_dict)


@student_bp.route('/<student_id>', methods=['GET'])
def get_student_info(student_id):
    student = Student.query.get_or_404(student_id)

    jsonify(student={'id': student.id,
                     'first_name': student.first_name,
                     'last_name': student.last_name,
                     'grade': student.grade,
                     'address': student.address,
                     'image': student.image
                     })


@student_bp.route('/<student_id>/guardians', methods=['GET'])
def get_student_guardians(student_id):
    guardians = Guardian.query.filter_by(student_id=student_id, blacklist=False).all()

    json_dict = {'guardian': {'id': guardian.id,
                              'first_name': guardian.first_name,
                              'last_name': guardian.last_name,
                              'relationship': guardian.relationship,
                              'image': guardian.image,
                              'home_phone': guardian.home_phone,
                              'mobile_phone': guardian.mobile_phone,
                              'work_phone': guardian.work_phone,
                              'email': guardian.emai,
                              'address': guardian.address,
                              'pick_up_times': guardian.pick_up_times} for guardian in guardians}
    return jsonify(guardians=json_dict)

@student_bp.route('/<student_id>/guardians/blacklisted', methods=['GET'])
def get_blacklisted_guardians(student_id):
    guardians = Guardian.query.filter_by(student_id=student_id, blacklist=True).all()

    json_dict = {'guardian': {'id': guardian.id,
                              'first_name': guardian.first_name,
                              'last_name': guardian.last_name,
                              'image': guardian.image,
                              } for guardian in guardians}
    return jsonify(guardians=json_dict)

@student_bp.route('/new', methods=['POST'])
def create_new_student():
    if not request.json.get('first_name') or not request.json.get('last_name') or not request.json.get('address') or not request.json.get('grade') or not request.json.get('dob'):
        abort(400)
    if Student.query.filter_by(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), grade=request.json.get('grade'), dob=request.json.get('dob'), address=request.json.get('address')).first():
        abort(400)
    new_student = Student(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), grade=request.json.get('grade'), dob=request.json.get('dob'), address=request.json.get('address'))
    db.session.add(new_student)
    db.session.commit()
    return jsonify(student={'id': new_student.id,
                     'first_name': new_student.first_name,
                     'last_name': new_student.last_name,
                     'grade': new_student.grade,
                     'address': new_student.address,
                     'image': new_student.image
                     })