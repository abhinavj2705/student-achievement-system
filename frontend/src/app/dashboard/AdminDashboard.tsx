import { Shield, Activity, Users, Database, ServerCrash, ArrowUpRight, Lock } from 'lucide-react';
import { User } from '@/types';

export default function AdminDashboard({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Shield className="w-64 h-64 text-blue-500" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">System Administration</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Admin Control Center
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Monitor overall system health, manage all research clusters, and review system-wide analytics and audit logs.
          </p>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Users', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Active Clusters', value: '34', change: '+2', icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { title: 'System Uptime', value: '99.99%', change: 'Optimal', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { title: 'Unresolved Errors', value: '3', change: '-5', icon: ServerCrash, color: 'text-rose-500', bg: 'bg-rose-500/10' },
        ].map((metric, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110 ${metric.bg}`}></div>
            <div className="relative z-10">
              <metric.icon className={`w-8 h-8 mb-4 ${metric.color}`} />
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</h3>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <span className={`text-xs font-semibold mb-1 flex items-center ${metric.title.includes('Errors') ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {metric.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* System Health */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Global Platform Overview</h2>
            <button className="text-sm font-medium text-primary hover:underline">View Detailed Analytics</button>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Server Capacity</span>
                <span className="text-muted-foreground">45% Used</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Database Storage</span>
                <span className="text-muted-foreground">78% Used (Warning)</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">API Rate Limits</span>
                <span className="text-muted-foreground">12% Used</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs Preview */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Audit Logs</h2>
          <div className="flex-1 space-y-4">
            {[
              { action: 'Role Updated', user: 'admin@sys.com', time: '10 mins ago', type: 'info' },
              { action: 'Failed Login Attempt', user: 'unknown IP', time: '1 hr ago', type: 'warn' },
              { cluster: 'BioTech Cluster Created', user: 'Dr. Smith', time: '3 hrs ago', type: 'success' },
              { action: 'System Backup Complete', user: 'System', time: '5 hrs ago', type: 'success' },
            ].map((log, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  log.type === 'warn' ? 'bg-amber-500' : 
                  log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">{log.action || log.cluster}</p>
                  <p className="text-xs text-muted-foreground mt-1">{log.user} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
}
