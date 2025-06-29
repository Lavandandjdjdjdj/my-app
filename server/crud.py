from sqlalchemy.orm import Session
from . import models, schemas

def create_submission(db: Session, submission: schemas.SubmissionCreate, file_path: str, original_filename: str):
    db_submission = models.Submission(
        name=submission.name,
        surname=submission.surname,
        original_filename=original_filename,
        file_path=file_path
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission