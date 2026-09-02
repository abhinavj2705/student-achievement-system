'use client';

import Link from 'next/link';
import { GraduationCap, Users, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export default function LoginSelectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Left Branding Panel */}
        <div className="lg:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 flex flex-col text-white relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">EduPortal</span>
          </div>

          <div className="relative z-10 mt-auto mb-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
              Welcome to the <br/>Research Cluster <br/>Ecosystem
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
              A unified platform to manage achievements, monitor research progress, and streamline academic administration.
            </p>
          </div>

          <div className="relative z-10 mt-16 flex items-center gap-4 text-sm font-medium text-blue-200">
            <BookOpen className="w-5 h-5" />
            <span>Academic Excellence & Innovation</span>
          </div>
        </div>

        {/* Right Selection Panel */}
        <div className="lg:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Select your portal</h2>
              <p className="text-slate-500 text-base">Choose your designated role to sign in to your dashboard.</p>
            </div>

            <div className="space-y-4">
              {/* Student Card */}
              <Link href="/login/student" className="group flex items-center p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors mr-6 shrink-0">
                  <GraduationCap className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Student Login</h3>
                  <p className="text-sm text-slate-500 mt-1">Access your research milestones and projects.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                </div>
              </Link>

              {/* Faculty Card */}
              <Link href="/login/faculty" className="group flex items-center p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300">
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-500 transition-colors mr-6 shrink-0">
                  <Users className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Faculty / Head Login</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage clusters and evaluate student progress.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                </div>
              </Link>

              {/* Admin Card */}
              <Link href="/login/admin" className="group flex items-center p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-purple-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-300">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors mr-6 shrink-0">
                  <ShieldCheck className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Administrator</h3>
                  <p className="text-sm text-slate-500 mt-1">Oversee platform operations and system health.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
