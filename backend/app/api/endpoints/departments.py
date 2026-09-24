from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ... import models, schemas
from ...api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Department])
def read_departments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve departments.
    """
    departments = db.query(models.Department).offset(skip).limit(limit).all()
    return departments

@router.post("/", response_model=schemas.Department)
def create_department(
    *,
    db: Session = Depends(deps.get_db),
    department_in: schemas.DepartmentCreate,
    current_user: models.User = Depends(deps.get_current_active_admin),
) -> Any:
    """
    Create new department.
    """
    department = db.query(models.Department).filter(models.Department.code == department_in.code).first()
    if department:
        raise HTTPException(status_code=400, detail="Department with this code already exists.")
    
    department = models.Department(
        name=department_in.name,
        code=department_in.code,
    )
    db.add(department)
    db.commit()
    db.refresh(department)
    return department
