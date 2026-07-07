'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Building2, MoreVertical, GraduationCap, Users } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function DepartmentsPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Archived'>('All');
  const departments = mockData.departments;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage institutional departments and faculties.</p>
        </div>
        
        <button className="btn-gradient px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2 rounded-2xl border shadow-sm">
        <div className="pill-toggle-container">
          {['All', 'Active', 'Archived'].map((tab) => (
            <div
              key={tab}
              onClick={() => setFilter(tab as 'All' | 'Active' | 'Archived')}
              className={`pill-toggle ${filter === tab ? 'active' : 'inactive'}`}
            >
              {tab}
            </div>
          ))}
        </div>
        
        <div className="relative flex-1 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search departments..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="grid gap-6 mt-6">
        {departments.map((dept, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={dept.id}
            className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="bg-primary/10 text-primary p-4 rounded-2xl flex-shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-xl text-foreground">{dept.name}</h3>
                <span className="bg-muted px-2 py-0.5 rounded-md text-xs font-bold text-muted-foreground">{dept.code}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{dept.description}</p>
              
              <div className="flex items-center gap-6 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">{dept.facultyCount}</span> Faculty
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="font-medium">{dept.studentCount}</span> Students
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{dept.courses}</div> Courses
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-xl md:w-64 w-full">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Head of Department</p>
              <p className="font-semibold text-foreground">{dept.head}</p>
            </div>
            
            <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors absolute top-4 right-4 md:static">
              <MoreVertical className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
