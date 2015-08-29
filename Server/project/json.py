from attrdict import AttrDict
from .models import Base

class BaseRepresentation(AttrDict):

    def __init__(self, model=None):
        super(AttrDict,self).__init__()

        if model:
            if not isinstance(model, Base):
                raise TypeError()

            self.id = model.id


class StudentRepresentation(BaseRepresentation):
    def __init__(self, student):
        super(StudentRepresentation,self).__init__(student)

        self.grade = student.grade
        self.first_name = student.first_name
        self.last_name = student.last_name
        self.image = student.image
        self.dob = student.dob
        self.address = student.address


class GuardianRepresentation(BaseRepresentation):
    def __init__(self, guardian):
        super(GuardianRepresentation,self).__init__(guardian)
        self.student_id = guardian.student_id

        self.first_name = guardian.first_name
        self.last_name = guardian.last_name
        self.image = guardian.image
        self.relationship = guardian.relationship
        self.home_phone = guardian.home_phone
        self.mobile_phone = guardian.mobile_phone
        self.work_phone = guardian.work_phone
        self.email = guardian.email
        self.address = guardian.address
        self.pick_up_times = guardian.pick_up_times

        self.blacklist = guardian.blacklist

class EventRepresentation(BaseRepresentation):
    def __init__(self, studentevent):
        super(EventRepresentation, self).__init__(studentevent)
        self.student_id = studentevent.student_id
        self.guardian_id = studentevent.guardian_id
        self.event = studentevent.event
        self.time = studentevent.time