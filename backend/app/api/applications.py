from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import Application, Job, User
from pydantic import BaseModel

router = APIRouter()

class ApplicationCreate(BaseModel):
    job_id: int
    user_id: int # In production, this comes from the JWT token

@router.post("/apply")
def apply_for_job(application: ApplicationCreate, db: Session = Depends(get_db)):
    # Check if job exists
    job = db.query(Job).filter(Job.id == application.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Check if already applied
    existing = db.query(Application).filter(
        Application.job_id == application.job_id, 
        Application.user_id == application.user_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already applied for this job")
    
    new_app = Application(job_id=application.job_id, user_id=application.user_id)
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return {"message": "Application successful", "application_id": new_app.id}

@router.get("/my-applications/{user_id}")
def get_user_applications(user_id: int, db: Session = Depends(get_db)):
    return db.query(Application).filter(Application.user_id == user_id).all()
