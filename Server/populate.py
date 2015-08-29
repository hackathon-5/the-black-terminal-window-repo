from project.models import db, Student, Guardian

s1 = Student(first_name="johny", last_name="appleseed", grade="1st", dob="9/17/2009", address="jurey lane")
s2 = Student(first_name="jimmey", last_name="applebomb", grade="1st", dob="7/4/2008", address="kurdes way")
g1 = Guardian(student_id=1, first_name="suzy", last_name="appleseed", relationship="mother", address="jurey lane")

db.session.add(s1)
db.session.add(s2)
db.session.add(g1)
db.session.commit()