'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Monitor } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function ClassroomsPage() {
  const [filter, setFilter] = useState<'All' | 'Available' | 'Under Maintenance'>('All');
  const classrooms = mockData.classrooms;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Classrooms</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage {classrooms.length} physical spaces and capacities.</p>
        </div>
        
        <button className="btn-gradient px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Classroom
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2 rounded-2xl border shadow-sm">
        <div className="pill-toggle-container">
          {['All', 'Available', 'Under Maintenance'].map((tab) => (
            <div
              key={tab}
              onClick={() => setFilter(tab as 'All' | 'Available' | 'Under Maintenance')}
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
            placeholder="Search rooms..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {classrooms.map((room, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={room.id}
            className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-xl">
                <Monitor className="w-6 h-6" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${room.status === 'Available' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                {room.status}
              </span>
            </div>
            
            <div>
              <h3 className="font-bold text-xl">{room.roomNumber}</h3>
              <p className="text-muted-foreground text-sm">{room.building}, Floor {room.floor}</p>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs">Type</span>
                <span className="font-medium">{room.type}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-muted-foreground text-xs">Capacity</span>
                <span className="font-medium">{room.capacity} Seats</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
