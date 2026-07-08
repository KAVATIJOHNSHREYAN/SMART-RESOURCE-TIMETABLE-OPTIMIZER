'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Users, Filter, Mail, Phone, Briefcase } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function FacultyPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'On Leave'>('All');
  const faculty = mockData.faculty;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Faculty Management</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage {faculty.length} instructors and their workload constraints.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="btn-gradient px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Faculty
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2 rounded-2xl border shadow-sm">
        <div className="pill-toggle-container">
          {['All', 'Active', 'On Leave'].map((tab) => (
            <div
              key={tab}
              onClick={() => setFilter(tab as 'All' | 'Active' | 'On Leave')}
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
            placeholder="Search by name, ID or department..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {faculty.map((fac, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={fac.id}
            className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-2 h-full ${fac.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-bold text-lg truncate text-foreground">{fac.name}</h3>
                <p className="text-sm font-medium text-primary mt-0.5">{fac.employeeId} &bull; {fac.qualification}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span className="truncate">{fac.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{fac.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{fac.phone}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t flex justify-between items-center text-sm">
                  <div className="bg-muted px-3 py-1 rounded-full font-medium">
                    {fac.experience} Yrs Exp
                  </div>
                  <div className="font-semibold">
                    Workload: <span className={fac.workload > 15 ? 'text-red-500' : 'text-foreground'}>{fac.workload}h</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
