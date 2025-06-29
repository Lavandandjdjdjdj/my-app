from pydantic import BaseModel

class SubmissionCreate(BaseModel):
    name: str
    surname: str

class SubmissionResponse(SubmissionCreate):
    id: int
    original_filename: str
    file_path: str