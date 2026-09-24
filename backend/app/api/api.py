from fastapi import APIRouter
from .endpoints import auth, departments, engine, export

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(departments.router, prefix="/departments", tags=["departments"])
api_router.include_router(engine.router, prefix="/engine", tags=["engine"])
api_router.include_router(export.router, prefix="/export", tags=["export"])
