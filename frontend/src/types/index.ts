export enum UserRole {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export enum AchievementStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REVISION_REQUIRED = 'REVISION_REQUIRED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  departmentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cluster {
  id: string;
  name: string;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  studentId: string;
  title: string;
  description: string;
  category: string;
  date: string;
  organization?: string;
  role?: string;
  status: AchievementStatus;
  reviewerId?: string;
  reviewerFeedback?: string;
  createdAt: string;
  updatedAt: string;
  // Relations
  student?: User;
  reviewer?: User;
  skills?: Skill[];
  certificate?: Certificate;
}

export interface Certificate {
  id: string;
  achievementId: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface StudentSkillProgress {
  id: string;
  studentId: string;
  skillId: string;
  proficiencyLevel: number; // e.g., 1-100 or 1-5
  createdAt: string;
  updatedAt: string;
  // Relations
  skill?: Skill;
}

export interface Assignment {
  id: string;
  userId: string;
  targetId: string; // clusterId, departmentId, etc.
  type: 'CLUSTER_MENTOR' | 'STUDENT_CLUSTER' | 'DEPARTMENT_HEAD';
  effectiveFrom: string;
  effectiveTo?: string;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  generatedBy: string;
  data: any;
  createdAt: string;
}
