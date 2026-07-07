from typing import List, Dict, Any

class TimetableAnalytics:
    def __init__(self, entries: List[Dict[str, Any]], total_time_slots: int, total_rooms: int, total_faculty: int):
        self.entries = entries
        self.total_time_slots = total_time_slots
        self.total_rooms = total_rooms
        self.total_faculty = total_faculty

    def analyze(self) -> Dict[str, Any]:
        room_utilization = self._calculate_room_utilization()
        faculty_workload = self._calculate_faculty_workload()
        suggestions = self._generate_ai_suggestions()
        
        return {
            "room_utilization_percent": room_utilization,
            "faculty_workload_distribution": faculty_workload,
            "suggestions": suggestions
        }

    def _calculate_room_utilization(self) -> float:
        if self.total_time_slots == 0 or self.total_rooms == 0:
            return 0.0
        
        total_possible_slots = self.total_time_slots * self.total_rooms
        used_slots = len([e for e in self.entries if e.get("room_id") is not None])
        
        return round((used_slots / total_possible_slots) * 100, 2)

    def _calculate_faculty_workload(self) -> Dict[str, Any]:
        workloads = {}
        for entry in self.entries:
            fac_id = entry.get("faculty_id")
            if fac_id is not None:
                workloads[fac_id] = workloads.get(fac_id, 0) + 1
        
        if not workloads:
            return {"average": 0, "max": 0, "min": 0}
            
        values = list(workloads.values())
        return {
            "average": round(sum(values) / len(values), 2),
            "max": max(values),
            "min": min(values),
            "details": workloads
        }

    def _generate_ai_suggestions(self) -> List[str]:
        suggestions = []
        
        # Example pseudo-analysis
        # In a real system, you would check specific underutilized rooms or consecutive heavy loads for faculty.
        room_usage = {}
        for entry in self.entries:
            room = entry.get("room_id")
            if room:
                room_usage[room] = room_usage.get(room, 0) + 1
                
        # Find least used room
        if room_usage:
            least_used = min(room_usage, key=room_usage.get)
            most_used = max(room_usage, key=room_usage.get)
            
            if room_usage[most_used] - room_usage[least_used] > 3:
                suggestions.append(
                    f"Consider moving some classes from Room {most_used} to Room {least_used} to balance utilization."
                )
                
        # Generic suggestion based on data volume
        if len(self.entries) > 0 and self._calculate_room_utilization() < 50:
            suggestions.append("Room utilization is below 50%. You might be able to close a building on certain days to save energy.")

        return suggestions
