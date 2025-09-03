from sqlalchemy import Column, String, Integer,ForeignKey
from database import Base
import uuid
from sqlalchemy.orm import relationship


class Patient(Base):
    __tablename__ = "PATIENTS"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(20), nullable=False)
    contactNo = Column(String(20), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    district = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    status = Column(String(50), default="undiagnosed")
    apptStatus = Column(String(50), nullable=True)
    applnStatus = Column(String(50), nullable=True)


class Insurer(Base):
    __tablename__ = "INSURERS"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    companyName = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    contactNo = Column(String(20), nullable=False)
    address = Column(String(255), nullable=False)
    district = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)

class Application(Base):
    __tablename__ = "APPLICATIONS"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    patient_id = Column(String(36), ForeignKey("PATIENTS.id"), nullable=False)
    insurer_id = Column(String(36), ForeignKey("INSURERS.id"), nullable=False)
    applnStatus = Column(String(50), default="pending")

    # Relationships (optional, helps with ORM queries)
    patient = relationship("Patient", backref="applications")
    insurer = relationship("Insurer", backref="applications")