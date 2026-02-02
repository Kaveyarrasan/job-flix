from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import Job

router = APIRouter()

@router.get("/trending")
def get_trending_jobs(db: Session = Depends(get_db)):
    return db.query(Job).filter(Job.category == "Trending").all()

@router.get("/remote")
def get_remote_jobs(db: Session = Depends(get_db)):
    return db.query(Job).filter(Job.category == "Remote").all()

@router.get("/{job_id}")
def get_job_details(job_id: int, db: Session = Depends(get_db)):
    return db.query(Job).filter(Job.id == job_id).first()
