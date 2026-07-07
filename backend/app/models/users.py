from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey
from sqlalchemy.orm import relationship
import enum
from ..core.database import Base

class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    FACULTY = "FACULTY"
    STUDENT = "STUDENT"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.STUDENT, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    faculty_profile = relationship("Faculty", back_populates="user", uselist=False)
    student_profile = relationship("Student", back_populates="user", uselist=False)
