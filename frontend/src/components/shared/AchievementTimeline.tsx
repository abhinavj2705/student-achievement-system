import { AchievementStatus } from '@/types';
import { CheckCircle2, Circle } from 'lucide-react';

const workflowSteps = [
  { status: AchievementStatus.DRAFT, label: 'Draft' },
  { status: AchievementStatus.SUBMITTED, label: 'Submitted' },
  { status: AchievementStatus.PENDING_REVIEW, label: 'Under Review' },
  { status: AchievementStatus.APPROVED, label: 'Approved' },
];

export function AchievementTimeline({ currentStatus }: { currentStatus: AchievementStatus }) {
  // Determine if it's in a rejected/revision state
  const isErrorState = currentStatus === AchievementStatus.REJECTED || currentStatus === AchievementStatus.REVISION_REQUIRED;
  
  // Find current index based on standard workflow, ignoring error states for the main line
  let currentIndex = workflowSteps.findIndex(s => s.status === currentStatus);
  if (currentIndex === -1) {
    if (currentStatus === AchievementStatus.REVISION_REQUIRED) currentIndex = 2; // Under review but needs revision
    if (currentStatus === AchievementStatus.REJECTED) currentIndex = 2; // Under review and rejected
  }

  return (
    <div className="py-6 w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border rounded-full hidden sm:block"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full hidden sm:block transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (workflowSteps.length - 1)) * 100}%` }}
        ></div>

        <div className="relative flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
          {workflowSteps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex && !isErrorState;
            const isError = index === currentIndex && isErrorState;

            let circleClasses = "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-card z-10 relative transition-colors";
            let textClasses = "mt-3 text-sm font-medium transition-colors";

            if (isCompleted) {
              circleClasses += " border-primary text-primary";
              textClasses += " text-card-foreground";
            } else if (isCurrent) {
              circleClasses += " border-primary bg-primary text-primary-foreground";
              textClasses += " text-primary font-bold";
            } else if (isError) {
              circleClasses += ` ${currentStatus === AchievementStatus.REJECTED ? 'border-danger bg-danger' : 'border-warning bg-warning'} text-white`;
              textClasses += ` ${currentStatus === AchievementStatus.REJECTED ? 'text-danger' : 'text-warning'} font-bold`;
            } else {
              circleClasses += " border-border text-card-foreground/30";
              textClasses += " text-card-foreground/40";
            }

            return (
              <div key={step.status} className="flex flex-row sm:flex-col items-center sm:w-24 relative z-10">
                {/* Vertical line for mobile */}
                {index > 0 && (
                  <div className="absolute top-[-24px] left-4 w-1 h-6 bg-border sm:hidden -z-10"></div>
                )}
                {index > 0 && isCompleted && (
                  <div className="absolute top-[-24px] left-4 w-1 h-6 bg-primary sm:hidden -z-10"></div>
                )}

                <div className={circleClasses}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 bg-card rounded-full" />
                  ) : isError ? (
                    <span className="text-sm font-bold">!</span>
                  ) : (
                    <Circle className="w-2.5 h-2.5 fill-current" />
                  )}
                </div>
                <div className={`${textClasses} sm:text-center ml-4 sm:ml-0`}>
                  {isError ? (
                    currentStatus === AchievementStatus.REJECTED ? 'Rejected' : 'Revision Required'
                  ) : (
                    step.label
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
