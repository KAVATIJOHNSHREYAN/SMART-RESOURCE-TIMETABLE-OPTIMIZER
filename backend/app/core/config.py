from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Smart Resource & Timetable Optimizer"
    DATABASE_URL: str = "sqlite:///./srto.db"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = "SUPER_SECRET_KEY_PLEASE_CHANGE_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
