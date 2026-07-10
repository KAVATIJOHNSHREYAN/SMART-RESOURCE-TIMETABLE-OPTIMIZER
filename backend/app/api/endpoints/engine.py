# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi import APIRouter
from ...engine.constraints import ConstraintEngine

router = APIRouter()

class ValidationRequest(BaseModel):
    entries: List[Dict[str, Any]]

@router.post("/validate")
def validate_timetable(request: ValidationRequest):
    """
    Validate a provided timetable layout and return a list of conflicts.
    """
    engine = ConstraintEngine(request.entries)
    conflicts = engine.evaluate()
    
    is_valid = not any(c['severity'] == 'HARD' for c in conflicts)
    
    return {
        "is_valid": is_valid,
        "conflicts": conflicts
    }

class GenerationRequest(BaseModel):
    requirements: List[Dict[str, Any]]
    time_slots: List[int]
    rooms: List[int]
    faculty: List[int]
    generations: int = 50
    population_size: int = 50

@router.post("/generate")
def generate_timetable(request: GenerationRequest):
    from ...engine.genetic_algorithm import TimetableOptimizer
    
    optimizer = TimetableOptimizer(
        requirements=request.requirements,
        time_slots=request.time_slots,
        rooms=request.rooms,
        faculty=request.faculty
    )
    
    # Run the genetic algorithm
    best_schedule = optimizer.run(ngen=request.generations, pop_size=request.population_size)
    
    # Validate the result to get fitness details
    engine = ConstraintEngine(best_schedule)
    conflicts = engine.evaluate()
    
    return {
        "schedule": best_schedule,
        "conflicts": conflicts
    }

class AnalyticsRequest(BaseModel):
    entries: List[Dict[str, Any]]
    total_time_slots: int
    total_rooms: int
    total_faculty: int

@router.post("/analytics")
def analyze_timetable(request: AnalyticsRequest):
    from ...engine.analytics import TimetableAnalytics
    
    analyzer = TimetableAnalytics(
        entries=request.entries,
        total_time_slots=request.total_time_slots,
        total_rooms=request.total_rooms,
        total_faculty=request.total_faculty
    )
    
    return analyzer.analyze()
