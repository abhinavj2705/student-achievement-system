import { Users, CheckCircle, Clock, BarChart, ChevronRight, Search, FileText } from 'lucide-react';
import { User } from '@/types';

export default function FacultyDashboard({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-800 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-sm border border-white/10">
            <Users className="w-4 h-4" /> Research Cluster Head
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Welcome, Dr. {user?.lastName || 'Faculty'}
          </h1>
          <p className="text-teal-100 max-w-xl text-lg">
            Here is the overview of your research students, pending evaluations, and recent approvals.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Total Students', value: '42', icon: Users, color: 'text-blue-600', bg: 'bg-blue-500/10' },
          { label: 'Pending Approvals', value: '15', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Approved Remarks', value: '128', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Avg Cluster Score', value: '8.4', icon: BarChart, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground leading-none mb-1">{stat.value}</p>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Evaluation Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30">
          <div>
            <h2 className="text-xl font-bold text-foreground">Student Performance Overview</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage and evaluate students under your cluster.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-sm">
                <th className="px-6 py-4 font-medium text-muted-foreground">Student Name</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Research Topic</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Evaluation Score</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Pending Action</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: 'Alex Johnson', topic: 'Neural Networks Optimization', score: '9.2 / 10', pending: 'Thesis Chapter 2', status: 'critical' },
                { name: 'Sarah Williams', topic: 'Quantum Cryptography', score: '8.8 / 10', pending: 'Lab Results Approval', status: 'warning' },
                { name: 'Michael Chen', topic: 'Bioinformatics Pipeline', score: '7.5 / 10', pending: 'None', status: 'clear' },
                { name: 'Emily Davis', topic: 'Robotics Control Systems', score: '8.9 / 10', pending: 'Conference Paper', status: 'warning' },
              ].map((student, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{student.topic}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {student.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {student.pending !== 'None' ? (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">
                        <Clock className="w-4 h-4" /> {student.pending}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Up to date</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
