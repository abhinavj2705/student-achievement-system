import { User, UserRole } from '@/types';
import { Action, Resource, RolePermissions } from '@/types/rbac';

// Define base permissions per role
// NOTE: This is for UI hiding/showing ONLY. The backend is the source of truth for authorization.
const ROLE_PERMISSIONS: RolePermissions = {
  [UserRole.STUDENT]: [
    { action: Action.READ, resource: Resource.ACHIEVEMENT },
    { action: Action.CREATE, resource: Resource.ACHIEVEMENT },
    { action: Action.UPDATE, resource: Resource.ACHIEVEMENT }, // Only drafts or revisions
    { action: Action.READ, resource: Resource.SKILL },
    { action: Action.READ, resource: Resource.CERTIFICATE },
    { action: Action.CREATE, resource: Resource.CERTIFICATE },
    { action: Action.READ, resource: Resource.USER }, // Themselves
  ],
  [UserRole.FACULTY]: [
    { action: Action.READ, resource: Resource.ACHIEVEMENT },
    { action: Action.APPROVE, resource: Resource.ACHIEVEMENT },
    { action: Action.REJECT, resource: Resource.ACHIEVEMENT },
    { action: Action.REQUEST_REVISION, resource: Resource.ACHIEVEMENT },
    { action: Action.READ, resource: Resource.SKILL },
    { action: Action.READ, resource: Resource.CERTIFICATE },
    { action: Action.READ, resource: Resource.USER }, // Assigned students
    { action: Action.READ, resource: Resource.REPORT },
  ],
  [UserRole.ADMIN]: [
    { action: Action.CREATE, resource: Resource.USER },
    { action: Action.READ, resource: Resource.USER },
    { action: Action.UPDATE, resource: Resource.USER },
    
    { action: Action.CREATE, resource: Resource.DEPARTMENT },
    { action: Action.READ, resource: Resource.DEPARTMENT },
    { action: Action.UPDATE, resource: Resource.DEPARTMENT },

    { action: Action.CREATE, resource: Resource.CLUSTER },
    { action: Action.READ, resource: Resource.CLUSTER },
    { action: Action.UPDATE, resource: Resource.CLUSTER },

    { action: Action.CREATE, resource: Resource.ASSIGNMENT },
    { action: Action.READ, resource: Resource.ASSIGNMENT },
    { action: Action.UPDATE, resource: Resource.ASSIGNMENT },

    { action: Action.READ, resource: Resource.ACHIEVEMENT },
    { action: Action.READ, resource: Resource.SKILL },
    { action: Action.READ, resource: Resource.CERTIFICATE },
    { action: Action.READ, resource: Resource.REPORT },
    { action: Action.READ, resource: Resource.AUDIT_LOG },
  ]
};

/**
 * Checks if a user has permission to perform an action on a resource.
 * @param user The current user
 * @param action The action they are trying to perform
 * @param resource The resource they are acting upon
 * @returns boolean
 */
export function canAccess(user: User | null, action: Action, resource: Resource): boolean {
  if (!user) return false;

  const permissions = ROLE_PERMISSIONS[user.role];
  if (!permissions) return false;

  return permissions.some(p => p.action === action && p.resource === resource);
}
