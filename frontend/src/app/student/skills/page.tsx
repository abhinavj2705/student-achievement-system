'use client';

import { DashboardLayout } from '@/layouts/DashboardLayout';
import { SkillProgressBar } from '@/components/shared/SkillProgressBar';
import { GraduationCap } from 'lucide-react';

export default function StudentSkillsPage() {
  const skills = [
    { id: '1', name: 'Programming', proficiency: 80, category: 'Technical', achievementsCount: 4 },
    { id: '2', name: 'Leadership', proficiency: 60, category: 'Soft Skill', achievementsCount: 2 },
    { id: '3', name: 'Communication', proficiency: 70, category: 'Soft Skill', achievementsCount: 3 },
    { id: '4', name: 'Data Analysis', proficiency: 45, category: 'Technical', achievementsCount: 1 },
    { id: '5', name: 'Project Management', proficiency: 55, category: 'Business', achievementsCount: 2 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">My Skills</h1>
          <p className="text-card-foreground/70 text-sm mt-1">
            Track your skill development based on your approved achievements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <SkillProgressBar 
            key={skill.id}
            name={skill.name}
            proficiency={skill.proficiency}
            achievementsCount={skill.achievementsCount}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
