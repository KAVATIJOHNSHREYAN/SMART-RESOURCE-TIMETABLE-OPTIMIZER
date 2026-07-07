import io
import csv
from typing import Any, List, Dict
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

router = APIRouter()

class ExportRequest(BaseModel):
    timetable_id: int
    entries: List[Dict[str, Any]]

@router.post("/csv")
def export_timetable_csv(request: ExportRequest) -> Any:
    """
    Export timetable entries to a CSV file.
    """
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow([
        "Section ID", 
        "Subject ID", 
        "Faculty ID", 
        "Room ID", 
        "Time Slot ID"
    ])
    
    # Write rows
    for entry in request.entries:
        writer.writerow([
            entry.get("section_id", ""),
            entry.get("subject_id", ""),
            entry.get("faculty_id", ""),
            entry.get("room_id", ""),
            entry.get("time_slot_id", "")
        ])
    
    output.seek(0)
    
    response = StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv"
    )
    response.headers["Content-Disposition"] = f"attachment; filename=timetable_{request.timetable_id}.csv"
    return response
