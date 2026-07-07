from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from ..core.database import Base

class TimetableStatus(str, enum.Enum):
    GENERATING = "GENERATING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class Timetable(Base):
    __tablename__ = "timetables"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    semester_id = Column(Integer, ForeignKey("semesters.id"))
    status = Column(String, default=TimetableStatus.GENERATING.value) # Use string for enum compatibility if needed
    fitness_score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    semester = relationship("Semester")
    entries = relationship("TimetableEntry", back_populates="timetable", cascade="all, delete-orphan")

class TimetableEntry(Base):
    __tablename__ = "timetable_entries"
    id = Column(Integer, primary_key=True, index=True)
    timetable_id = Column(Integer, ForeignKey("timetables.id", ondelete="CASCADE"))
    section_id = Column(Integer, ForeignKey("sections.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    faculty_id = Column(Integer, ForeignKey("faculty.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    time_slot_id = Column(Integer, ForeignKey("time_slots.id"))
    
    timetable = relationship("Timetable", back_populates="entries")
    section = relationship("Section")
    subject = relationship("Subject")
    faculty = relationship("Faculty")
    room = relationship("Room")
    time_slot = relationship("TimeSlot")

class ConstraintType(str, enum.Enum):
    HARD = "HARD"
    SOFT = "SOFT"

class Constraint(Base):
    __tablename__ = "constraints"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    constraint_type = Column(String, default=ConstraintType.HARD.value)
    is_active = Column(Boolean, default=True)
    weight = Column(Float, default=1.0) # Used for soft constraints penalty scoring

class Preference(Base):
    __tablename__ = "preferences"
    id = Column(Integer, primary_key=True, index=True)
    faculty_id = Column(Integer, ForeignKey("faculty.id", ondelete="CASCADE"))
    time_slot_id = Column(Integer, ForeignKey("time_slots.id", ondelete="CASCADE"))
    preference_level = Column(Integer, default=1) # 1=Preferred, -1=Avoid
    
    faculty = relationship("Faculty")
    time_slot = relationship("TimeSlot")
