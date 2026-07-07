'use client';

import { motion } from 'framer-motion';
import { Users, Building2, Monitor, UserCheck } from 'lucide-react';
import { mockData } from '@/lib/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const stats = [
    { name: 'Total Students', value: mockData.students.length, icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Total Faculty', value: mockData.faculty.length, icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { name: 'Departments', value: mockData.departments.length, icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Classrooms', value: mockData.classrooms.length, icon: Monitor, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Room Utilization (%)',
        data: [85, 90, 78, 88, 75, 40],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Computer Science', 'Electrical', 'Business', 'Mechanical'],
    datasets: [
      {
        data: [150, 100, 120, 130],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Institutional Overview</h2>
          <p className="text-muted-foreground text-sm mt-1">Real-time metrics and system health.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.name}
            className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-muted-foreground text-sm font-medium">{stat.name}</p>
            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border rounded-2xl p-6 shadow-sm md:col-span-2"
        >
          <h3 className="font-semibold text-lg mb-6">Weekly Utilization Trends</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <Bar options={{ responsive: true, maintainAspectRatio: false }} data={barChartData} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card border rounded-2xl p-6 shadow-sm"
        >
          <h3 className="font-semibold text-lg mb-6">Student Distribution</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <Doughnut options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} data={doughnutData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
