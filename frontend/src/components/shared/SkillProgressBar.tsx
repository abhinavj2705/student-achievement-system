export function SkillProgressBar({ 
  name, 
  proficiency,
  achievementsCount
}: { 
  name: string; 
  proficiency: number;
  achievementsCount?: number;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-card-foreground">{name}</h3>
        <span className="text-sm font-bold text-primary">{proficiency}%</span>
      </div>
      
      <div className="w-full bg-background border border-border rounded-full h-3 mb-3 overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${proficiency}%` }}
        ></div>
      </div>
      
      {achievementsCount !== undefined && (
        <p className="text-xs text-card-foreground/60 font-medium text-right">
          Backed by {achievementsCount} achievement{achievementsCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
