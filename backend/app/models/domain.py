from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Time, Enum
from sqlalchemy.orm import relationship
import enum
from ..core.database import Base

class Building(Base):
    __tablename__ = "buildings"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    
    rooms = relationship("Room", back_populates="building")

class RoomType(str, enum.Enum):
    LECTURE = "LECTURE"
    LAB = "LAB"

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    room_type = Column(Enum(RoomType), default=RoomType.LECTURE)
    building_id = Column(Integer, ForeignKey("buildings.id"))
    
    building = relationship("Building", back_populates="rooms")
    
class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    code = Column(String, unique=True, index=True, nullable=False)
    
    programs = relationship("Program", back_populates="department")
    faculty = relationship("Faculty", back_populates="department")
    subjects = relationship("Subject", back_populates="department")

class Program(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    
    department = relationship("Department", back_populates="programs")
    semesters = relationship("Semester", back_populates="program")

class Semester(Base):
    __tablename__ = "semesters"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    program_id = Column(Integer, ForeignKey("programs.id"))
    
    program = relationship("Program", back_populates="semesters")
    sections = relationship("Section", back_populates="semester")

class Section(Base):
    __tablename__ = "sections"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    semester_id = Column(Integer, ForeignKey("semesters.id"))
    student_count = Column(Integer, nullable=False, default=0)
    
    semester = relationship("Semester", back_populates="sections")
    students = relationship("Student", back_populates="section")

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    code = Column(String, unique=True, index=True, nullable=False)
    credit_hours = Column(Integer, nullable=False)
    requires_lab = Column(Boolean, default=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    
    department = relationship("Department", back_populates="subjects")

class Faculty(Base):
    __tablename__ = "faculty"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    max_weekly_hours = Column(Integer, default=40)
    max_daily_hours = Column(Integer, default=8)
    
    user = relationship("User", back_populates="faculty_profile")
    department = relationship("Department", back_populates="faculty")

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    section_id = Column(Integer, ForeignKey("sections.id"))
    
    user = relationship("User", back_populates="student_profile")
    section = relationship("Section", back_populates="students")

class TimeSlot(Base):
    __tablename__ = "time_slots"
    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(Integer, nullable=False) # 0=Monday, 6=Sunday
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
