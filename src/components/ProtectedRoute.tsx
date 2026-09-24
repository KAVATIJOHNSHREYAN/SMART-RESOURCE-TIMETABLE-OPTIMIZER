'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'FACULTY' | 'STUDENT')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, user, router, allowedRoles, pathname]);

  if (!isMounted || !isAuthenticated) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>; // Could be a skeleton
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
