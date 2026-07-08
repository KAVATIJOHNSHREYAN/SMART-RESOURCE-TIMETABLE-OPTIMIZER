'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ThemeProvider } from '@/components/ThemeProvider';
import { usePathname } from 'next/navigation';

const roleAccess: Record<string, ('ADMIN' | 'FACULTY' | 'STUDENT')[]> = {
  '/admin/dashboard': ['ADMIN', 'FACULTY', 'STUDENT'],
  '/admin/faculty': ['ADMIN'],
  '/admin/students': ['ADMIN', 'FACULTY'],
  '/admin/departments': ['ADMIN'],
  '/admin/subjects': ['ADMIN', 'FACULTY', 'STUDENT'],
  '/admin/classrooms': ['ADMIN'],
  '/admin/timetable': ['ADMIN', 'FACULTY', 'STUDENT'],
  '/admin/reports': ['ADMIN'],
  '/admin/notifications': ['ADMIN', 'FACULTY', 'STUDENT'],
  '/admin/settings': ['ADMIN'],
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Default to ADMIN only for unknown routes just to be safe
  const allowedRoles = roleAccess[pathname] || ['ADMIN'];

  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
