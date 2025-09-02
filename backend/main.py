import re
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, validator
from database import Base, engine, get_db, Patient, Insurer
import auth
from auth import create_access_token, verify_password

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Password Policy -----------------
PASSWORD_REGEX = re.compile(r'^[A-Z][A-Za-z0-9@#$%^&+=!]{7,}$')


# ----------------- Schemas -----------------
class PatientSignup(BaseModel):
    name: str
    age: int
    gender: str
    contactNo: str
    email: EmailStr
    password: str
    address: str
    district: str
    country: str

    @validator("password")
    def validate_password(cls, v):
        if not PASSWORD_REGEX.match(v):
            raise ValueError("Password must start with capital, min 8 chars, include digit & special char")
        return v


class PatientLogin(BaseModel):
    email: EmailStr
    password: str


class InsurerSignup(BaseModel):
    companyName: str
    email: EmailStr
    password: str
    contactNo: str
    address: str
    district: str
    country: str

    @validator("password")
    def validate_password(cls, v):
        if not PASSWORD_REGEX.match(v):
            raise ValueError("Password must start with capital, min 8 chars, include digit & special char")
        return v


class InsurerLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    role: str  # added role field


# ----------------- Patient Routes -----------------
@app.post("/patient/signup", response_model=Token)
def patient_signup(user: PatientSignup, db: Session = Depends(get_db)):
    existing = db.query(Patient).filter(Patient.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Patient email already registered")

    hashed_pw = auth.get_password_hash(user.password)
    new_patient = Patient(
        name=user.name,
        age=user.age,
        gender=user.gender,
        contactNo=user.contactNo,
        email=user.email,
        password=hashed_pw,
        address=user.address,
        district=user.district,
        country=user.country,
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    token = create_access_token({"sub": new_patient.email, "role": "patient"})
    return {"access_token": token, "token_type": "bearer", "role": "patient"}


@app.post("/patient/login", response_model=Token)
def patient_login(user: PatientLogin, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.email == user.email).first()
    if not patient or not verify_password(user.password, patient.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": patient.email, "role": "patient"})
    return {"access_token": token, "token_type": "bearer", "role": "patient"}


# ----------------- Insurer Routes -----------------
@app.post("/insurer/signup", response_model=Token)
def insurer_signup(user: InsurerSignup, db: Session = Depends(get_db)):
    existing = db.query(Insurer).filter(Insurer.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Insurer email already registered")

    hashed_pw = auth.get_password_hash(user.password)
    new_insurer = Insurer(
        companyName=user.companyName,
        email=user.email,
        password=hashed_pw,
        contactNo=user.contactNo,
        address=user.address,
        district=user.district,
        country=user.country,
    )
    db.add(new_insurer)
    db.commit()
    db.refresh(new_insurer)

    token = create_access_token({"sub": new_insurer.email, "role": "insurer"})
    return {"access_token": token, "token_type": "bearer", "role": "insurer"}


@app.post("/insurer/login", response_model=Token)
def insurer_login(user: InsurerLogin, db: Session = Depends(get_db)):
    insurer = db.query(Insurer).filter(Insurer.email == user.email).first()
    if not insurer or not verify_password(user.password, insurer.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": insurer.email, "role": "insurer"})
    return {"access_token": token, "token_type": "bearer", "role": "insurer"}
