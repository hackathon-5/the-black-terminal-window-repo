import arrow
from flask import Blueprint, jsonify, request, g, abort,json
from ..models import Student, Guardian, StudentEvents
from ..helpers.auth import require_auth, renew_token
from .. import db
from ..json import StudentRepresentation, GuardianRepresentation, EventRepresentation

student_bp = Blueprint('student',__name__, url_prefix='/student')
# student_bp.before_request(require_auth)
# student_bp.after_request(renew_token())


@student_bp.route('/list', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify(students=[StudentRepresentation(s)for s in students])



@student_bp.route('/<student_id>', methods=['GET'])
def get_student_info(student_id):
    student = Student.query.get_or_404(student_id)

    return jsonify(StudentRepresentation(student))


@student_bp.route('/<student_id>/guardians', methods=['GET'])
def get_student_guardians(student_id):
    guardians = Guardian.query.filter_by(student_id=student_id, blacklist=False).all()
    return jsonify(guardians=[GuardianRepresentation(g)for g in guardians])


@student_bp.route('/<student_id>/guardians/blacklisted', methods=['GET'])
def get_blacklisted_guardians(student_id):
    guardians = Guardian.query.filter_by(student_id=student_id, blacklist=True).all()

    return jsonify(guardians=[GuardianRepresentation(g) for g in guardians])


@student_bp.route('/new', methods=['POST'])
def create_new_student():
    if not request.json.get('first_name') or not request.json.get('last_name') or not request.json.get('address') or not request.json.get('grade') or not request.json.get('dob'):
        abort(400)
    if Student.query.filter_by(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), grade=request.json.get('grade'), dob=request.json.get('dob'), address=request.json.get('address')).first():
        abort(400)
    new_student = Student(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), address=request.json.get('address'), dob=request.json.get('dob'), grade=request.json.get('grade'))
    for attr in request.json.keys():
        if hasattr(new_student, attr):
            setattr(new_student, attr, request.json.get(attr))

    db.session.add(new_student)
    db.session.commit()
    return jsonify(StudentRepresentation(new_student))


@student_bp.route('/<student_id>/guardian', methods=['POST'])
def create_new_guardian(student_id):
    if not request.json.get('first_name') or not request.json.get('last_name') or not request.json.get('address') or not request.json.get('relationship'):
        abort(400)
    if Guardian.query.filter_by(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), address=request.json.get('address')).first():
        abort(400)

    new_guardian = Guardian(first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), relationship=request.json.get('reationship'))
    for attr in request.json.keys():
        if hasattr(new_guardian, attr):
            setattr(new_guardian, attr, request.json.get(attr))

    db.session.add(new_guardian)
    db.session.commit()

    return jsonify(GuardianRepresentation(new_guardian))

@student_bp.route('/event', methods=['POST'])
def create_event():
    if not request.json.get('reason') or not request.json.get('student_id') or not request.json.get('guardian_id'):
        abort(400)
    student = Student.query.get_or_404(request.json.get('student_id'))
    guardian =Guardian.query.get_or_404(request.json.get('guardian_id'))

    event = StudentEvents(student_id=student.id, guardian_id=guardian.id,
                          event=request.json.get('reason'), time=str(arrow.utcnow()))
    db.session.add(event)
    db.session.commit()

    return jsonify(EventRepresentation(event))

@student_bp.route('/<student_id>/events', methods=['GET'])
def get_events(student_id):
    student_events = StudentEvents.query.filter_by(student_id=student_id).all()

    return jsonify(events=[EventRepresentation(e)for e in student_events])