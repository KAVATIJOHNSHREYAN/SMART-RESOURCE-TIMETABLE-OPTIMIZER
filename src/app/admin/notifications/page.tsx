'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CalendarCheck, Info } from 'lucide-react';

const notifications = [
  { id: 1, type: 'alert', title: 'Timetable Conflict Detected', msg: 'Room A-101 double booked on Monday 10:00 AM.', time: '10 mins ago' },
  { id: 2, type: 'success', title: 'Schedule Optimization Complete', msg: 'Genetic algorithm successfully generated Fall 2026 timetable.', time: '2 hours ago' },
  { id: 3, type: 'info', title: 'New Faculty Onboarded', msg: 'Dr. Sarah Connor added to Computer Science department.', time: '1 day ago' },
  { id: 4, type: 'warning', title: 'Low Attendance Alert', msg: '35 students dropped below 75% attendance in CS201.', time: '2 days ago' },
  { id: 5, type: 'info', title: 'System Maintenance', msg: 'Scheduled downtime this Sunday at 2 AM EST.', time: '3 days ago' },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      <div className="flex flex-col justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground text-sm mt-1">Recent system alerts and updates.</p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {notifications.map((notif, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={notif.id}
            className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className={`p-3 rounded-full flex-shrink-0 ${
              notif.type === 'alert' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
              notif.type === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
              notif.type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
              'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {notif.type === 'alert' && <AlertTriangle className="w-5 h-5" />}
              {notif.type === 'success' && <CalendarCheck className="w-5 h-5" />}
              {notif.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
              {notif.type === 'info' && <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-foreground">{notif.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notif.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notif.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
