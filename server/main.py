from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine
import os
import uuid

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/submissions")
async def upload_file(
    file: UploadFile = File(...),
    name: str = Form(...),
    surname: str = Form(...),
    db: Session = Depends(get_db)
):
    file_path = f"uploads/{uuid.uuid4()}_{file.filename}"
    os.makedirs("uploads", exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    submission = schemas.SubmissionCreate(name=name, surname=surname)
    db_submission = crud.create_submission(db, submission, file_path, file.filename)
    
    return {"message": "Файл загружен", "id": db_submission.id}