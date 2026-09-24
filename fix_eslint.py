import os
import re

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = re.sub(old, new, content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = r"c:\Users\johns\Documents\SMART RESOURCE & TIMETABLE OPTIMIZER\frontend\src"

# classrooms
replace_in_file(os.path.join(base_path, "app", "admin", "classrooms", "page.tsx"), [
    (r"Plus, Search, Monitor, MoreVertical", r"Plus, Search, Monitor"),
    (r"setFilter\(tab as any\)", r"setFilter(tab as 'All' | 'Available' | 'Under Maintenance')")
])

# dashboard
replace_in_file(os.path.join(base_path, "app", "admin", "dashboard", "page.tsx"), [
    (r"Users, Building2, BookOpen, Calendar, Monitor, UserCheck", r"Users, Building2, Monitor, UserCheck")
])

# departments
replace_in_file(os.path.join(base_path, "app", "admin", "departments", "page.tsx"), [
    (r"setFilter\(tab as any\)", r"setFilter(tab as 'All' | 'Active' | 'Archived')")
])

# faculty
replace_in_file(os.path.join(base_path, "app", "admin", "faculty", "page.tsx"), [
    (r"Plus, Search, Users, MoreVertical, Filter, Mail, Phone, Briefcase", r"Plus, Search, Users, Filter, Mail, Phone, Briefcase"),
    (r"setFilter\(tab as any\)", r"setFilter(tab as 'All' | 'Active' | 'On Leave')")
])

# layout
replace_in_file(os.path.join(base_path, "app", "admin", "layout.tsx"), [
    (r"\s*// Title map based on route[\s\S]*?};\n", r"")
])

# notifications
replace_in_file(os.path.join(base_path, "app", "admin", "notifications", "page.tsx"), [
    (r"Bell, AlertTriangle, CalendarCheck, UserPlus, Info", r"AlertTriangle, CalendarCheck, Info")
])

# students
replace_in_file(os.path.join(base_path, "app", "admin", "students", "page.tsx"), [
    (r"Plus, Search, UserCheck, MoreVertical, Filter", r"Plus, Search, MoreVertical, Filter"),
    (r"setFilter\(tab as any\)", r"setFilter(tab as 'All' | 'Active' | 'Suspended')")
])

# subjects
replace_in_file(os.path.join(base_path, "app", "admin", "subjects", "page.tsx"), [
    (r"setFilter\(tab as any\)", r"setFilter(tab as 'All' | 'Core' | 'Elective')")
])

# timetable
replace_in_file(os.path.join(base_path, "app", "admin", "timetable", "page.tsx"), [
    (r"Search, Filter, Calendar, Clock, MapPin, Plus, Download", r"Clock, MapPin, Plus, Download"),
    (r"const generateGridItem = \(day: string, time: string\) => {", r"const generateGridItem = (_day: string, _time: string) => {"),
    (r"setFilter\(tab as any\)", r"setFilter(tab as 'Computer Science' | 'Information Technology' | 'Business Administration')")
])

# mockData
replace_in_file(os.path.join(base_path, "lib", "mockData.ts"), [
    (r"function randomElement\(arr: any\[\]\) {", r"function randomElement<T>(arr: T[]): T {")
])

print("ESLint fixes applied.")
