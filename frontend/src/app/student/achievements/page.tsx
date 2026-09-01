'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Achievement, AchievementStatus } from '@/types';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AchievementCard } from '@/components/shared/AchievementCard';

export default function AchievementsList() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration until backend is connected
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        studentId: '1',
        title: 'First Place in National Hackathon',
        description: 'Led a team of 4 to build an AI-powered educational tool. Won first place out of 50 teams.',
        category: 'Competition',
        date: '2023-11-15T00:00:00.000Z',
        status: AchievementStatus.APPROVED,
        createdAt: '2023-11-20T10:00:00.000Z',
        updatedAt: '2023-11-25T14:00:00.000Z',
      },
      {
        id: '2',
        studentId: '1',
        title: 'Published Paper on Machine Learning',
        description: 'Co-authored a paper on optimization algorithms for neural networks, published in IEEE conference.',
        category: 'Research',
        date: '2024-02-10T00:00:00.000Z',
        status: AchievementStatus.PENDING_REVIEW,
        createdAt: '2024-02-15T09:30:00.000Z',
        updatedAt: '2024-02-15T09:30:00.000Z',
      },
      {
        id: '3',
        studentId: '1',
        title: 'React Native Developer Certification',
        description: 'Completed the advanced React Native developer certification by Meta.',
        category: 'Certification',
        date: '2024-05-01T00:00:00.000Z',
        status: AchievementStatus.REVISION_REQUIRED,
        reviewerFeedback: 'Please upload the actual certificate document as proof.',
        createdAt: '2024-05-05T11:20:00.000Z',
        updatedAt: '2024-05-10T16:45:00.000Z',
      },
      {
        id: '4',
        studentId: '1',
        title: 'Open Source Contribution to Next.js',
        description: 'Fixed a bug in the routing system of Next.js framework.',
        category: 'Open Source',
        date: '2024-08-20T00:00:00.000Z',
        status: AchievementStatus.DRAFT,
        createdAt: '2024-08-22T08:15:00.000Z',
        updatedAt: '2024-08-22T08:15:00.000Z',
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setAchievements(mockAchievements);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">My Achievements</h1>
        </div>
        
        <Link 
          href="/student/achievements/new"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Achievement
        </Link>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-[260px] shrink-0 bg-card rounded-xl animate-pulse flex flex-col">
              <div className="h-40 bg-border/50 rounded-xl mb-3"></div>
              <div className="w-3/4 h-4 bg-border/50 rounded mb-2"></div>
              <div className="w-1/2 h-3 bg-border/50 rounded"></div>
            </div>
          ))}
        </div>
      ) : achievements.length > 0 ? (
        <div className="space-y-10">
          <section>
            <h2 className="text-[17px] font-bold text-card-foreground mb-4">Recent Achievements</h2>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[17px] font-bold text-card-foreground">Drafts & Revisions</h2>
              <span className="text-sm font-medium text-primary hover:underline cursor-pointer">See all</span>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {achievements
                .filter(a => a.status === AchievementStatus.DRAFT || a.status === AchievementStatus.REVISION_REQUIRED)
                .map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              {achievements.filter(a => a.status === AchievementStatus.DRAFT || a.status === AchievementStatus.REVISION_REQUIRED).length === 0 && (
                <p className="text-sm text-card-foreground/50 italic">No drafts or revisions pending.</p>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-card border border-border border-dashed rounded-xl p-12 text-center mt-8">
          <div className="w-16 h-16 bg-card-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-card-foreground/40" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No achievements yet</h3>
          <p className="text-card-foreground/60 max-w-md mx-auto mb-6">
            You haven't added any achievements yet. Click the button below to add your first achievement and start building your portfolio.
          </p>
          <Link 
            href="/student/achievements/new"
            className="inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Achievement
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
