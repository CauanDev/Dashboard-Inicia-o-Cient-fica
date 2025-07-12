from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://prod_admin:V8z1X3EBLBXka8irpJ@localhost:5432/dashboard_ic"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL  # Remover o parâmetro check_same_thread
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
