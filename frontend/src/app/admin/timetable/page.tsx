'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Plus, Download } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function TimetablePage() {
  const [filter, setFilter] = useState<'Computer Science' | 'Information Technology' | 'Business Administration'>('Computer Science');
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

  // Generate a realistic static grid representation based on mock data
  const generateGridItem = () => {
    // Empty slots simulation
    if (Math.random() > 0.7) return null;

    const subject = mockData.subjects[Math.floor(Math.random() * mockData.subjects.length)];
    const room = mockData.classrooms[Math.floor(Math.random() * mockData.classrooms.length)];
    const faculty = mockData.faculty[Math.floor(Math.random() * mockData.faculty.length)];

    return { subject, room, faculty };
  };

  return (
    <div className="space-y-6 w-full max-w-full pb-20 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Master Timetable Grid</h2>
          <p className="text-muted-foreground text-sm mt-1">Interactive drag-and-drop schedule representation.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2 bg-muted text-foreground hover:bg-muted/80">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-gradient px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Run Engine
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2 rounded-2xl border shadow-sm">
        <div className="pill-toggle-container overflow-x-auto whitespace-nowrap hide-scrollbar">
          {['Computer Science', 'Information Technology', 'Business Administration'].map((tab) => (
            <div
              key={tab}
              onClick={() => setFilter(tab as 'Computer Science' | 'Information Technology' | 'Business Administration')}
              className={`pill-toggle ${filter === tab ? 'active' : 'inactive'}`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-card border rounded-2xl shadow-sm overflow-x-auto mt-6">
        <div className="min-w-[1000px] w-full">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b bg-muted/30">
            <div className="p-4 border-r font-semibold text-center text-muted-foreground flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2" />
              Time
            </div>
            {times.map(t => (
              <div key={t} className="p-4 border-r font-medium text-center text-sm">{t}</div>
            ))}
          </div>

          {/* Day Rows */}
          {days.map((day, dIdx) => (
            <div key={day} className="grid grid-cols-8 border-b">
              <div className="p-4 border-r font-semibold text-center bg-muted/10 flex items-center justify-center">
                {day}
              </div>
              
              {times.map((time, tIdx) => {
                const item = generateGridItem();
                return (
                  <div key={`${day}-${time}`} className="p-2 border-r min-h-[120px] bg-background hover:bg-muted/10 transition-colors relative group">
                    {item ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (dIdx * 0.1) + (tIdx * 0.05) }}
                        className="h-full w-full bg-primary/10 border border-primary/20 rounded-xl p-3 flex flex-col justify-between cursor-move hover:shadow-md transition-shadow"
                      >
                        <div>
                          <p className="font-bold text-sm text-foreground leading-tight truncate" title={item.subject.name}>{item.subject.name}</p>
                          <p className="text-xs text-primary font-medium mt-1">{item.subject.code}</p>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-[10px] text-muted-foreground flex items-center truncate"><MapPin className="w-3 h-3 mr-1"/> {item.room.roomNumber}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{item.faculty.name}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-full w-full rounded-xl border-2 border-dashed border-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
