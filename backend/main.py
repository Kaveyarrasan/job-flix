from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import jobs, applications

app = FastAPI(title="Job Portal API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(jobs.router, prefix="/api/jobs", tags=["jobs"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])

@app.get("/")
def read_root():
    return {"message": "Job Portal Backend is Running"}
