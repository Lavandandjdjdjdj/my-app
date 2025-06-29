from sqlalchemy import Column, String, Integer
from .database import Base

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String)
    original_filename = Column(String)
    file_path = Column(String)