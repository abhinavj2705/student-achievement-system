import { UserRole } from './index';

export enum Action {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REQUEST_REVISION = 'REQUEST_REVISION'
}

export enum Resource {
  ACHIEVEMENT = 'ACHIEVEMENT',
  SKILL = 'SKILL',
  CERTIFICATE = 'CERTIFICATE',
  USER = 'USER',
  DEPARTMENT = 'DEPARTMENT',
  CLUSTER = 'CLUSTER',
  ASSIGNMENT = 'ASSIGNMENT',
  REPORT = 'REPORT',
  AUDIT_LOG = 'AUDIT_LOG'
}

export interface Permission {
  action: Action;
  resource: Resource;
}

export type RolePermissions = {
  [key in UserRole]: Permission[];
};
