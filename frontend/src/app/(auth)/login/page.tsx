'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, LogIn } from 'lucide-react';
import { UserRole } from '@/types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Temporarily mock login for testing since backend isn't ready
      // This bypasses the actual fetch call that would fail right now
      // await login(email, password);
      
      // Mock logic:
      let role = UserRole.STUDENT;
      if (email.includes('faculty')) role = UserRole.FACULTY;
      if (email.includes('admin')) role = UserRole.ADMIN;
      
      const mockUser = {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        role,
        status: 'ACTIVE' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('token', 'mock_token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      if (role === UserRole.STUDENT) router.push('/student/achievements');
      else if (role === UserRole.FACULTY) router.push('/faculty/reviews');
      else if (role === UserRole.ADMIN) router.push('/admin/users');
      else router.push('/dashboard');
      
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-card-foreground text-center">
            Student Achievement & Skill Management
          </h1>
          <p className="text-card-foreground/60 text-sm mt-2 text-center">
            Sign in to access your portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-md">
            <p className="text-sm text-danger text-center font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="e.g. student@university.edu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-card-foreground/50">
          <p>Demo Login Tips:</p>
          <p>Use "faculty@test.com" for Faculty</p>
          <p>Use "admin@test.com" for Admin</p>
          <p>Any other email logs in as Student</p>
        </div>
      </div>
    </div>
  );
}
