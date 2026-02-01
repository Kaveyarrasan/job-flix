from app.database import engine, SessionLocal
from app.models.schemas import Base, Job

def init_db():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if we already have jobs
    if db.query(Job).count() == 0:
        print("Seeding database with initial jobs...")
        jobs = [
            Job(title="Senior React Developer", company="TechFlow", category="Trending", logo_url="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=168&fit=crop", description="Lead frontend engineer role."),
            Job(title="Python Engineer", company="DataViz", category="Trending", logo_url="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=168&fit=crop", description="Data processing with Python."),
            Job(title="Remote HR Manager", company="GlobalTalent", category="Remote", logo_url="https://images.unsplash.com/photo-1521737706645-51cbd2863711?w=300&h=168&fit=crop", description="Global HR management."),
        ]
        db.add_all(jobs)
        db.commit()
        print("Database initialized!")
    else:
        print("Database already contains data.")
    
    db.close()

if __name__ == "__main__":
    init_db()
