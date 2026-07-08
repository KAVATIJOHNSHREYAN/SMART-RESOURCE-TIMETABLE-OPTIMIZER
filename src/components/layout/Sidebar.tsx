'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Building2, 
  Calendar, 
  Settings, 
  LogOut,
  UserCheck,
  Monitor,
  BarChart3,
  Bell,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { name: 'Faculty', href: '/admin/faculty', icon: Users, roles: ['ADMIN'] },
  { name: 'Students', href: '/admin/students', icon: UserCheck, roles: ['ADMIN', 'FACULTY'] },
  { name: 'Departments', href: '/admin/departments', icon: Building2, roles: ['ADMIN'] },
  { name: 'Subjects', href: '/admin/subjects', icon: BookOpen, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { name: 'Classrooms', href: '/admin/classrooms', icon: Monitor, roles: ['ADMIN'] },
  { name: 'Timetable', href: '/admin/timetable', icon: Calendar, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3, roles: ['ADMIN'] },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['ADMIN'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const visibleItems = sidebarItems.filter(item => 
    user?.role && item.roles.includes(user.role as string)
  );

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r bg-background/50 backdrop-blur-md">
      <div>
        <div className="flex h-16 items-center px-6 font-bold text-lg tracking-tight">
          <Clock className="mr-2 h-6 w-6 text-primary" />
          SRTO
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-4">
          {visibleItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              {pathname === item.href && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={logout}
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
