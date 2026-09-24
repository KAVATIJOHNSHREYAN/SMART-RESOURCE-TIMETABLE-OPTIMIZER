'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreVertical, Filter } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function StudentsPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Suspended'>('All');
  const students = mockData.students;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students Directory</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage {students.length} student records and academic status.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="btn-gradient px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Student
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2 rounded-2xl border shadow-sm">
        <div className="pill-toggle-container">
          {['All', 'Active', 'Suspended'].map((tab) => (
            <div
              key={tab}
              onClick={() => setFilter(tab as 'All' | 'Active' | 'Suspended')}
              className={`pill-toggle ${filter === tab ? 'active' : 'inactive'}`}
            >
              {tab}
            </div>
          ))}
        </div>
        
        <div className="relative flex-1 max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name or roll number..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Roll Number</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Sem/Sec</th>
                <th className="px-6 py-4 font-medium">CGPA</th>
                <th className="px-6 py-4 font-medium">Attendance</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.slice(0, 20).map((student, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={student.id} 
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{student.rollNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">S{student.semester} - {student.section}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className={parseFloat(student.cgpa) >= 3.5 ? "text-emerald-500" : "text-foreground"}>
                      {student.cgpa}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                        <div 
                          className={`h-2 rounded-full ${student.attendance < 75 ? 'bg-destructive' : 'bg-primary'}`} 
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-muted/20 text-center text-sm text-muted-foreground">
          Showing 20 of {students.length} students (Pagination Mock)
        </div>
      </div>
    </div>
  );
}
