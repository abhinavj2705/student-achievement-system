'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Send, Upload } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { achievementService } from '@/services/achievementService';

export default function NewAchievementPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    organization: '',
    role: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      // await achievementService.create({ ...formData, status: AchievementStatus.DRAFT });
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/student/achievements');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitForReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // const newAchievement = await achievementService.create({ ...formData, status: AchievementStatus.DRAFT });
      // await achievementService.submitForReview(newAchievement.id);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/student/achievements');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link 
          href="/student/achievements"
          className="inline-flex items-center gap-2 text-sm font-medium text-card-foreground/60 hover:text-card-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Achievements
        </Link>
        <h1 className="text-2xl font-bold text-card-foreground">Add New Achievement</h1>
        <p className="text-card-foreground/70 text-sm mt-1">
          Record a new academic or extracurricular achievement.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 max-w-4xl">
        <form onSubmit={handleSubmitForReview}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="title">
                Achievement Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="e.g. First Place in National Hackathon"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              >
                <option value="">Select a category</option>
                <option value="Competition">Competition</option>
                <option value="Research">Research / Publication</option>
                <option value="Certification">Certification</option>
                <option value="Project">Project</option>
                <option value="Leadership">Leadership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="date">
                Date Achieved *
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="organization">
                Organization / Event
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="e.g. Google, IEEE, University Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="role">
                Position / Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="e.g. Team Lead, Presenter"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-card-foreground mb-1.5" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                placeholder="Describe your achievement, responsibilities, and impact..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-card-foreground mb-1.5">
                Supporting Evidence / Certificate
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md bg-background/50 hover:bg-background transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-card-foreground/30" />
                  <div className="flex text-sm text-card-foreground/70 justify-center">
                    <span className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-card-foreground/50">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSaveDraft}
              className="px-6 py-2.5 rounded-md border border-border bg-card text-card-foreground font-medium hover:bg-background transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
