# database.py
from sqlalchemy import create_engine, Column, String, Boolean, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import uuid
import json

SQLALCHEMY_DATABASE_URL = (
    "snowflake://LOKI05:Lokeshpushparaj2005@XWFMNNJ-FH04519/YGGDRASIL/PUBLIC"
    "?warehouse=COMPUTE_WH&role=ACCOUNTADMIN"
)

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    with engine.connect() as connection:
        print("✅ Snowflake connection successful!")
except Exception as e:
    print(f"❌ Snowflake connection failed: {e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


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
    status = Column(String(50), default="undiagnosed")  # undertreated/undiagnosed
    apptStatus = Column(String(50), nullable=True)  # scheduled/completed
    applnStatus = Column(String(50), nullable=True)  # pending/accepted/declined
    moodScore = Column(Integer, nullable=True)
    riskLevel = Column(String(50), nullable=True)


class Insurer(Base):
    __tablename__ = "INSURERS"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    companyName = Column(String(150), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    contactNo = Column(String(20), nullable=False)
    address = Column(String(255), nullable=False)
    district = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    insuredMembers = Column(String(5000), default="[]")  # JSON string of patient ids
    status = Column(String(50), default=None)  # adequate/inadequate


Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
