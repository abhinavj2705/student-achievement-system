'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import AdminDashboard from './AdminDashboard';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    try {
      setUser(JSON.parse(storedUser) as User);
    } catch (e) {
      console.error('Failed to parse user', e);
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      {user.role === UserRole.STUDENT && <StudentDashboard user={user} />}
      {user.role === UserRole.FACULTY && <FacultyDashboard user={user} />}
      {user.role === UserRole.ADMIN && <AdminDashboard user={user} />}
    </DashboardLayout>
  );
}
