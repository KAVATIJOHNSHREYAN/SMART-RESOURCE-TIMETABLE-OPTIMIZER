'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen, MoreVertical, Clock, X } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function SubjectsPage() {
  const [allSubjects, setAllSubjects] = useState(mockData.subjects);
  const [filter, setFilter] = useState<'All' | 'Core' | 'Elective'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', credits: 3, department: 'Computer Science' });
  
  const subjects = allSubjects.filter(sub => {
    // sub.type does not exist in mockData, we can simulate it if needed or just filter by name
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub = {
      id: allSubjects.length + 1,
      name: newSubject.name,
      code: newSubject.code,
      credits: newSubject.credits,
      semester: 1,
      department: newSubject.department,
      weeklyHours: newSubject.credits + 1,
      status: 'Active'
    };
    setAllSubjects([newSub, ...allSubjects]);
    setIsAddModalOpen(false);
    setNewSubject({ name: '', code: '', credits: 3, department: 'Computer Science' });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subjects Catalog</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage {mockData.subjects.length} courses and subject credits.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-gradient px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Subject
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2 rounded-2xl border shadow-sm">
        <div className="pill-toggle-container">
          {['All', 'Core', 'Elective'].map((tab) => (
            <div
              key={tab}
              onClick={() => setFilter(tab as 'All' | 'Core' | 'Elective')}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject code or name..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Code</th>
                <th className="px-6 py-4 font-medium">Subject Name</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Credits</th>
                <th className="px-6 py-4 font-medium">Sem</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subjects.map((sub, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={sub.id} 
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-primary">{sub.code}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{sub.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {sub.weeklyHours} hrs/week
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{sub.department}</td>
                  <td className="px-6 py-4">
                    <span className="bg-muted px-2 py-1 rounded-md font-medium">{sub.credits}</span>
                  </td>
                  <td className="px-6 py-4">Sem {sub.semester}</td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-medium">
                      {sub.status}
                    </span>
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
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-md p-6 rounded-2xl border shadow-xl relative"
          >
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Subject</h3>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Subject Name</label>
                <input 
                  required
                  type="text" 
                  value={newSubject.name}
                  onChange={e => setNewSubject({...newSubject, name: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-muted/50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Course Code</label>
                <input 
                  required
                  type="text" 
                  value={newSubject.code}
                  onChange={e => setNewSubject({...newSubject, code: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-muted/50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Credits</label>
                  <input 
                    type="number"
                    min="1" max="6"
                    value={newSubject.credits}
                    onChange={e => setNewSubject({...newSubject, credits: parseInt(e.target.value)})}
                    className="w-full mt-1 px-3 py-2 bg-muted/50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <select 
                    value={newSubject.department}
                    onChange={e => setNewSubject({...newSubject, department: e.target.value})}
                    className="w-full mt-1 px-3 py-2 bg-muted/50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option>Computer Science</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full btn-gradient py-2.5 rounded-xl font-semibold mt-4">
                Save Subject
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
