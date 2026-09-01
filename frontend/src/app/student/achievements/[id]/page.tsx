'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, Calendar, FileText, User as UserIcon } from 'lucide-react';
import { Achievement, AchievementStatus } from '@/types';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AchievementTimeline } from '@/components/shared/AchievementTimeline';
import { use } from 'react';

export default function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setAchievement({
        id: resolvedParams.id,
        studentId: '1',
        title: 'First Place in National Hackathon',
        description: 'Led a team of 4 to build an AI-powered educational tool. We utilized React, Node.js, and OpenAI API to build a dynamic learning platform that adapts to student learning curves. Won first place out of 50 teams across the country.',
        category: 'Competition',
        date: '2023-11-15T00:00:00.000Z',
        organization: 'National Tech Association',
        role: 'Team Lead & Frontend Developer',
        status: AchievementStatus.PENDING_REVIEW,
        createdAt: '2023-11-20T10:00:00.000Z',
        updatedAt: '2023-11-25T14:00:00.000Z',
        skills: [
          { id: '1', name: 'React', category: 'Technical', createdAt: '', updatedAt: '' },
          { id: '2', name: 'Leadership', category: 'Soft Skill', createdAt: '', updatedAt: '' },
          { id: '3', name: 'Public Speaking', category: 'Soft Skill', createdAt: '', updatedAt: '' }
        ]
      });
      setLoading(false);
    }, 600);
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-border rounded mb-6"></div>
          <div className="h-8 w-2/3 bg-border rounded mb-8"></div>
          <div className="h-32 w-full bg-border rounded-xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!achievement) return null;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link 
          href="/student/achievements"
          className="inline-flex items-center gap-2 text-sm font-medium text-card-foreground/60 hover:text-card-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Achievements
        </Link>
        <h1 className="text-3xl font-bold text-card-foreground">{achievement.title}</h1>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm mb-8 overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">Approval Workflow</h2>
          <AchievementTimeline currentStatus={achievement.status} />
          
          {achievement.status === AchievementStatus.REVISION_REQUIRED && achievement.reviewerFeedback && (
            <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-md">
              <h3 className="text-sm font-bold text-warning mb-1">Reviewer Feedback:</h3>
              <p className="text-sm text-card-foreground/80">{achievement.reviewerFeedback}</p>
              <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                Edit & Resubmit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-card-foreground mb-4">Description</h2>
            <p className="text-card-foreground/80 leading-relaxed whitespace-pre-wrap">
              {achievement.description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-card-foreground mb-4">Associated Skills</h2>
            <div className="flex flex-wrap gap-2">
              {achievement.skills?.map(skill => (
                <span 
                  key={skill.id}
                  className="px-3 py-1.5 bg-background border border-border rounded-full text-sm font-medium text-card-foreground flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {skill.name}
                </span>
              ))}
              {(!achievement.skills || achievement.skills.length === 0) && (
                <p className="text-sm text-card-foreground/50">No skills associated yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-card-foreground mb-4">Details</h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-card-foreground/50 uppercase tracking-wider">Category</p>
                  <p className="text-sm font-semibold text-card-foreground">{achievement.category}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-card-foreground/50 uppercase tracking-wider">Date Achieved</p>
                  <p className="text-sm font-semibold text-card-foreground">{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              </div>

              {achievement.organization && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-card-foreground/50 uppercase tracking-wider">Organization/Event</p>
                    <p className="text-sm font-semibold text-card-foreground">{achievement.organization}</p>
                  </div>
                </div>
              )}

              {achievement.role && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-card-foreground/50 uppercase tracking-wider">Position/Role</p>
                    <p className="text-sm font-semibold text-card-foreground">{achievement.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
