from typing import List, Dict, Any

class TimetableConflict:
    def __init__(self, conflict_type: str, message: str, severity: str = "HARD"):
        self.conflict_type = conflict_type
        self.message = message
        self.severity = severity

    def to_dict(self):
        return {
            "type": self.conflict_type,
            "message": self.message,
            "severity": self.severity
        }

class ConstraintEngine:
    """
    Evaluates a given timetable against hard and soft constraints.
    """
    def __init__(self, entries: List[Dict[str, Any]]):
        # entries is a list of dicts representing proposed class times
        # Expected keys: section_id, subject_id, faculty_id, room_id, time_slot_id, day_of_week
        self.entries = entries
        self.conflicts: List[TimetableConflict] = []

    def evaluate(self) -> List[Dict]:
        self.check_faculty_double_booking()
        self.check_room_double_booking()
        self.check_student_group_overlap()
        # Evaluate soft constraints
        self.check_faculty_daily_limit()
        
        return [c.to_dict() for c in self.conflicts]

    def check_faculty_double_booking(self):
        """Hard constraint: A faculty member cannot teach two classes at the same time."""
        seen = set()
        for entry in self.entries:
            key = (entry.get('faculty_id'), entry.get('time_slot_id'))
            if key in seen and entry.get('faculty_id') is not None:
                self.conflicts.append(
                    TimetableConflict(
                        "FACULTY_DOUBLE_BOOKING", 
                        f"Faculty {entry.get('faculty_id')} is double-booked at timeslot {entry.get('time_slot_id')}.",
                        "HARD"
                    )
                )
            seen.add(key)

    def check_room_double_booking(self):
        """Hard constraint: A room cannot be occupied by two classes at the same time."""
        seen = set()
        for entry in self.entries:
            key = (entry.get('room_id'), entry.get('time_slot_id'))
            if key in seen and entry.get('room_id') is not None:
                self.conflicts.append(
                    TimetableConflict(
                        "ROOM_DOUBLE_BOOKING", 
                        f"Room {entry.get('room_id')} is double-booked at timeslot {entry.get('time_slot_id')}.",
                        "HARD"
                    )
                )
            seen.add(key)

    def check_student_group_overlap(self):
        """Hard constraint: A section (student group) cannot have two overlapping classes."""
        seen = set()
        for entry in self.entries:
            key = (entry.get('section_id'), entry.get('time_slot_id'))
            if key in seen and entry.get('section_id') is not None:
                self.conflicts.append(
                    TimetableConflict(
                        "STUDENT_GROUP_OVERLAP", 
                        f"Section {entry.get('section_id')} has overlapping classes at timeslot {entry.get('time_slot_id')}.",
                        "HARD"
                    )
                )
            seen.add(key)

    def check_faculty_daily_limit(self):
        """Soft constraint: Faculty shouldn't exceed their max daily teaching hours (simplified)."""
        # In a real scenario, we'd aggregate hours per day per faculty.
        # This is a placeholder for soft constraint logic.
        pass
