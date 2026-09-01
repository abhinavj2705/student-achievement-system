'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import { DashboardLayout } from '@/layouts/DashboardLayout';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
    
    try {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
      
      // Auto redirect based on role if they land here
      switch (parsedUser.role) {
        case UserRole.STUDENT:
          router.replace('/student/achievements');
          break;
        case UserRole.FACULTY:
          router.replace('/faculty/reviews');
          break;
        case UserRole.ADMIN:
          router.replace('/admin/users');
          break;
      }
    } catch (e) {
      // ignore
    }
  }, [router]);

  // Fallback if no redirect happens
  return (
    <DashboardLayout>
      <div className="bg-card border border-border rounded-xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Welcome to the Portal</h2>
        <p className="text-card-foreground/70">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </DashboardLayout>
  );
}
