'use client';

import { motion } from 'framer-motion';
import { Settings, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground text-sm mt-1">Configure global application preferences.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-2xl p-6 shadow-sm mt-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg">General Configuration</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Institution Name</label>
            <input type="text" defaultValue="Tech University" className="w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Academic Year</label>
            <input type="text" defaultValue="2026-2027" className="w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end">
          <button className="btn-gradient px-6 py-2 rounded-full font-medium text-sm flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
