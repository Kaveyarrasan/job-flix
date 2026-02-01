import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# For Supabase/PostgreSQL (Free Tier)
# Example: postgresql://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db") # Default to sqlite for local testing

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
