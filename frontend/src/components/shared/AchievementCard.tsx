import { Achievement, AchievementStatus } from '@/types';
import Link from 'next/link';
import { Award, Calendar, CheckCircle, Clock, FileEdit, AlertCircle, XCircle } from 'lucide-react';

const statusConfig = {
  [AchievementStatus.DRAFT]: { icon: FileEdit, color: 'text-card-foreground/50', bg: 'bg-card-foreground/10', label: 'Draft' },
  [AchievementStatus.SUBMITTED]: { icon: Clock, color: 'text-primary', bg: 'bg-primary/10', label: 'Submitted' },
  [AchievementStatus.PENDING_REVIEW]: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Under Review' },
  [AchievementStatus.APPROVED]: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Approved' },
  [AchievementStatus.REVISION_REQUIRED]: { icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10', label: 'Revision Required' },
  [AchievementStatus.REJECTED]: { icon: XCircle, color: 'text-danger', bg: 'bg-danger/10', label: 'Rejected' },
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const config = statusConfig[achievement.status];
  const Icon = config.icon;

  return (
    <Link href={`/student/achievements/${achievement.id}`} className="group flex flex-col w-[280px] shrink-0 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/20 transition-all duration-200 overflow-hidden">
      <div className="bg-slate-50 relative h-32 flex items-center justify-center border-b border-border/50">
        {/* Placeholder for achievement visual/certificate preview */}
        <div className={`w-14 h-14 rounded-full ${config.bg} flex items-center justify-center shadow-sm`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        
        {/* Status pill over the image */}
        <div className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold ${config.color} ${config.bg} shadow-sm`}>
          {config.label}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-card-foreground line-clamp-2 mb-1.5 leading-snug group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>
        
        <div className="mt-auto pt-2 flex items-center justify-between text-[12px] text-card-foreground/50 font-medium">
          <span>{achievement.category}</span>
          <span>{new Date(achievement.date).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
