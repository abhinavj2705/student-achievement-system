import { Trophy, Star, Award, Clock, ArrowRight, TrendingUp, FileText } from 'lucide-react';
import { User } from '@/types';

export default function StudentDashboard({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Welcome back, {user?.firstName || 'Student'}! 🔬
            </h1>
            <p className="text-blue-100 max-w-lg text-lg">
              Here is the latest progress on your research cluster milestones and active projects.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 shrink-0">
            <div className="text-center">
              <p className="text-xs font-medium text-blue-200 uppercase tracking-wider mb-1">Active Projects</p>
              <p className="text-3xl font-bold text-white">3</p>
            </div>
            <div className="w-px h-12 bg-white/20 mx-2"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-blue-200 uppercase tracking-wider mb-1">Total Research Hrs</p>
              <p className="text-3xl font-bold text-white">142</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10">
          <Trophy className="w-96 h-96" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: 'Achievements', value: '12', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Skills Verified', value: '8', icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Approvals', value: '2', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
            <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Milestones</h2>
          <button className="text-sm text-primary flex items-center gap-1 hover:underline font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-6">
          {[
            { title: 'Machine Learning Certificate', desc: 'Verified by Dr. Alan Turing', date: '2 days ago', icon: Award, color: 'text-emerald-500' },
            { title: 'Published Research Paper', desc: 'AI in Healthcare Journal', date: '1 week ago', icon: FileText, color: 'text-blue-500' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start pb-6 border-b border-border last:border-0 last:pb-0">
              <div className="p-2 bg-muted rounded-full shrink-0">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-base">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
