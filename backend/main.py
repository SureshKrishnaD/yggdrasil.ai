import re
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel, EmailStr, validator
from dotenv import load_dotenv
from database import get_db, engine, Base
from models import Patient, Insurer, Application
import auth
from auth import create_access_token, verify_password, get_current_user

# ------------------ ENVIRONMENT ------------------
load_dotenv()
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))

# ------------------ INITIALIZE ------------------
Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
PASSWORD_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$')

# ------------------ SCHEMAS ------------------
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
            raise ValueError("Password must be at least 8 chars, contain uppercase, lowercase, digit & special char")
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
            raise ValueError("Password must be at least 8 chars, contain uppercase, lowercase, digit & special char")
        return v

class InsurerLogin(BaseModel):
    email: EmailStr
    password: str

class PatientToken(BaseModel):
    access_token: str
    token_type: str
    role: str
    id: str
    status: str   # ✅ only in Patient

class InsurerToken(BaseModel):
    access_token: str
    token_type: str
    role: str
    id: str

class ApplyRequest(BaseModel):
    insurer_id: str

class ApplicationOut(BaseModel):
    id: str
    patient_name: str
    patient_email: str
    applnStatus: str

class UpdateApplicationStatus(BaseModel):
    status: str  # "accepted" or "declined"

class PatientApplicationOut(BaseModel):
    application_id: str
    patient_id: str
    name: str
    age: int
    gender: str
    riskLevel: str = None
    moodScore: float = None
    applnStatus: str

class AppointmentRequest(BaseModel):
    application_id: str
    scheduled_datetime: datetime

# ------------------ EMAIL FUNCTIONS ------------------
def send_status_email(patient_email: str, patient_name: str, status: str):
    subject = f"Your Insurance Application has been {status.capitalize()}"
    body = f"Hello {patient_name},\n\nYour insurance application status has been updated to: {status.upper()}.\n\nThank you."
    
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = patient_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, patient_email, msg.as_string())
        server.quit()
    except Exception as e:
        print(f"Error sending email: {e}")

def send_appointment_email(patient_email: str, patient_name: str, appt_datetime: datetime):
    subject = "Your Appointment has been Scheduled"
    body = f"Hello {patient_name},\n\nYour appointment has been scheduled on {appt_datetime.strftime('%A, %B %d, %Y at %I:%M %p')}.\n\nThank you."
    
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = patient_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, patient_email, msg.as_string())
        server.quit()
    except Exception as e:
        print(f"Error sending email: {e}")

# ------------------ PATIENT ROUTES ------------------
@app.post("/patient/signup", response_model=PatientToken)
def patient_signup(user: PatientSignup, db: Session = Depends(get_db)):
    existing = db.query(Patient).filter(Patient.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Patient email already registered")
    hashed_pw = auth.get_password_hash(user.password)
    new_patient = Patient(**user.dict(exclude={"password"}), password=hashed_pw, status="undiagnosed")
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    token = create_access_token({"sub": new_patient.email, "role": "patient", "id": new_patient.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "patient",
        "id": new_patient.id,
        "status": new_patient.status   # ✅ required
    }


@app.post("/patient/login", response_model=PatientToken)
def patient_login(user: PatientLogin, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.email == user.email).first()
    if not patient or not verify_password(user.password, patient.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": patient.email, "role": "patient", "id": patient.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "patient",
        "id": patient.id,
        "status": patient.status   # ✅ required
    }


@app.post("/patient/apply")
def apply_to_provider(body: ApplyRequest, db: Session = Depends(get_db), current_user: Patient = Depends(get_current_user)):
    patient = db.query(Patient).filter(Patient.id == current_user.id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    insurer = db.query(Insurer).filter(Insurer.id == body.insurer_id).first()
    if not insurer:
        raise HTTPException(status_code=404, detail="Insurer not found")
    existing_app = db.query(Application).filter(Application.patient_id == patient.id, Application.insurer_id == insurer.id).first()
    if existing_app:
        raise HTTPException(status_code=400, detail="Application already submitted")
    new_application = Application(patient_id=patient.id, insurer_id=insurer.id, applnStatus="pending")
    db.add(new_application)
    try:
        db.commit()
        db.refresh(new_application)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error submitting application")
    return {"message": "Application submitted successfully", "application_id": new_application.id, "applnStatus": new_application.applnStatus}

# ------------------ INSURER ROUTES ------------------
@app.post("/insurer/signup", response_model=InsurerToken)
def insurer_signup(user: InsurerSignup, db: Session = Depends(get_db)):
    existing = db.query(Insurer).filter(Insurer.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Insurer email already registered")
    hashed_pw = auth.get_password_hash(user.password)
    new_insurer = Insurer(**user.dict(exclude={"password"}), password=hashed_pw)
    db.add(new_insurer)
    db.commit()
    db.refresh(new_insurer)
    token = create_access_token({"sub": new_insurer.email, "role": "insurer", "id": new_insurer.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "insurer",
        "id": new_insurer.id   # ✅ no status
    }


@app.post("/insurer/login", response_model=InsurerToken)
def insurer_login(user: InsurerLogin, db: Session = Depends(get_db)):
    insurer = db.query(Insurer).filter(Insurer.email == user.email).first()
    if not insurer or not verify_password(user.password, insurer.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": insurer.email, "role": "insurer", "id": insurer.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "insurer",
        "id": insurer.id   # ✅ no status
    }


@app.get("/insurer/applications", response_model=List[ApplicationOut])
def get_applications(db: Session = Depends(get_db), current_insurer: Insurer = Depends(get_current_user)):
    applications = db.query(Application).filter(Application.insurer_id == current_insurer.id).all()
    result = []
    for app in applications:
        patient = db.query(Patient).filter(Patient.id == app.patient_id).first()
        result.append(ApplicationOut(id=app.id, patient_name=patient.name, patient_email=patient.email, applnStatus=app.applnStatus))
    return result

@app.put("/insurer/application/{application_id}")
def update_application_status(application_id: str, body: UpdateApplicationStatus, db: Session = Depends(get_db), current_insurer: Insurer = Depends(get_current_user)):
    app_record = db.query(Application).filter(Application.id == application_id, Application.insurer_id == current_insurer.id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    if body.status not in ["accepted", "declined"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    app_record.applnStatus = body.status
    db.commit()
    db.refresh(app_record)
    
    # Send email to patient
    patient = db.query(Patient).filter(Patient.id == app_record.patient_id).first()
    if patient:
        send_status_email(patient_email=patient.email, patient_name=patient.name, status=body.status)

    return {"message": f"Application {body.status} successfully", "applnStatus": app_record.applnStatus}

@app.get("/insurer/patient-applications", response_model=List[PatientApplicationOut])
def get_patient_applications(db: Session = Depends(get_db), current_insurer: Insurer = Depends(get_current_user)):
    applications = db.query(Application).filter(Application.insurer_id == current_insurer.id).all()
    result = []
    for app_record in applications:
        patient = db.query(Patient).filter(Patient.id == app_record.patient_id).first()
        if patient:
            result.append(PatientApplicationOut(application_id=app_record.id, patient_id=patient.id, name=patient.name, age=patient.age, gender=patient.gender, riskLevel=patient.status, moodScore=getattr(patient, "moodScore", None), applnStatus=app_record.applnStatus))
    return result

# ------------------ INSURER BOOK APPOINTMENT ------------------
@app.post("/insurer/book-appointment")
def book_appointment(request: AppointmentRequest, db: Session = Depends(get_db), current_insurer: Insurer = Depends(get_current_user)):
    app_record = db.query(Application).filter(
        Application.id == request.application_id,
        Application.insurer_id == current_insurer.id
    ).first()
    
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")

    patient = db.query(Patient).filter(Patient.id == app_record.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # Update patient appointment status and datetime
    patient.apptStatus = "scheduled"
    patient.appointment_datetime = request.scheduled_datetime
    db.commit()
    db.refresh(patient)

    # Send appointment email
    send_appointment_email(
        patient_email=patient.email,
        patient_name=patient.name,
        appt_datetime=request.scheduled_datetime
    )

    return {
        "message": "Appointment scheduled successfully",
        "appointment_datetime": request.scheduled_datetime,
        "apptStatus": patient.apptStatus
    }
