'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Users, ShieldAlert, ArrowRight } from 'lucide-react';

export default function LoginSelectionPage() {
  const [activeRole, setActiveRole] = useState<'student' | 'faculty' | 'admin'>('student');

  const roleConfig = {
    student: {
      title: 'Student Login',
      subtitle: 'Access your research milestones',
      desc: 'Sign in to track your ongoing projects and cluster updates.',
      icon: GraduationCap,
      href: '/login/student'
    },
    faculty: {
      title: 'Faculty Login',
      subtitle: 'Manage your research cluster',
      desc: 'Sign in to evaluate student progress and approve milestones.',
      icon: Users,
      href: '/login/faculty'
    },
    admin: {
      title: 'Admin Login',
      subtitle: 'System administration',
      desc: 'Sign in to oversee platform operations and manage clusters.',
      icon: ShieldCheck,
      href: '/login/admin'
    }
  };

  const CurrentRole = roleConfig[activeRole];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950 text-white font-sans overflow-hidden">
      {/* Background Gradient/Glows to simulate the dark moody background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
      
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">EduPortal</h1>
          <p className="text-sm md:text-base text-slate-400 max-w-sm px-4">
            EduPortal is a unified platform which helps students and faculty manage research clusters and track milestones.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="w-full flex flex-col items-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-slate-700"></span>
            Choose your role
            <span className="w-8 h-px bg-slate-700"></span>
          </p>
          <div className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 w-full max-w-[320px]">
            {(['student', 'faculty', 'admin'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex-1 text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 capitalize ${
                  activeRole === role 
                    ? 'bg-white/15 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Main Login Card */}
        <div className="w-full bg-[#16161a]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-2xl transition-all duration-300">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-1">{CurrentRole.title}</h2>
            <p className="text-sm text-slate-400 mb-1">{CurrentRole.subtitle}</p>
            <p className="text-xs text-slate-500">{CurrentRole.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <CurrentRole.icon className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-xs text-slate-300 text-left leading-relaxed flex-1">
              Sign in with your designated university credentials to access this portal.
            </p>
          </div>

          <Link
            href={CurrentRole.href}
            className="w-full flex items-center justify-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
          >
            Continue as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <Link href="/privacy-policy" className="flex items-center gap-2 bg-[#1a1a20] hover:bg-[#22222a] border border-white/10 rounded-full py-2 px-5 text-xs font-medium text-slate-300 transition-colors">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            Secure platform. Click to view Privacy Policy.
          </Link>
          
          <p className="text-[10px] font-semibold text-slate-500">
            By, The Developers Society
          </p>
        </div>

      </div>
    </div>
  );
}
