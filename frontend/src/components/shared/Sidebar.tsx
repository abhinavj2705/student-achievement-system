import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon, LayoutDashboard, Award, GraduationCap, FileText, Users, Building, ShieldCheck, FileBarChart, History, Plus } from 'lucide-react';
import { UserRole } from '@/types';

interface SidebarItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard, roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
  
  // Student specific
  { name: 'Achievements', href: '/student/achievements', icon: Award, roles: [UserRole.STUDENT] },
  { name: 'Skills', href: '/student/skills', icon: GraduationCap, roles: [UserRole.STUDENT] },
  { name: 'Certificates', href: '/student/certificates', icon: FileText, roles: [UserRole.STUDENT] },

  // Faculty specific
  { name: 'Reviews', href: '/faculty/reviews', icon: ShieldCheck, roles: [UserRole.FACULTY] },
  { name: 'Students', href: '/faculty/students', icon: Users, roles: [UserRole.FACULTY] },
  { name: 'Evaluations', href: '/faculty/evaluations', icon: FileText, roles: [UserRole.FACULTY] },
  { name: 'Cluster Projects', href: '/faculty/projects', icon: Building, roles: [UserRole.FACULTY] },
  { name: 'Reports', href: '/faculty/reports', icon: FileBarChart, roles: [UserRole.FACULTY] },

  // Admin specific
  { name: 'Users', href: '/admin/users', icon: Users, roles: [UserRole.ADMIN] },
  { name: 'Departments', href: '/admin/departments', icon: Building, roles: [UserRole.ADMIN] },
  { name: 'Security', href: '/admin/security', icon: ShieldCheck, roles: [UserRole.ADMIN] },
  { name: 'System Config', href: '/admin/config', icon: LayoutDashboard, roles: [UserRole.ADMIN] },
  { name: 'Reports', href: '/admin/reports', icon: FileBarChart, roles: [UserRole.ADMIN] },
  { name: 'Audit Logs', href: '/admin/audit-logs', icon: History, roles: [UserRole.ADMIN] },
];

export function Sidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();
  const filteredItems = sidebarItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      <aside className="w-64 bg-background h-screen sticky top-0 flex-col hidden md:flex shrink-0">
        <div className="p-6 flex flex-col">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-8">
            <GraduationCap className="w-6 h-6" />
            <span>EduPortal</span>
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-card text-primary shadow-sm border border-border' 
                    : 'text-foreground/70 hover:bg-card-foreground/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 flex items-center overflow-x-auto flex-nowrap px-2 py-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)] hide-scrollbar">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 min-w-[5rem] rounded-xl transition-all flex-shrink-0 ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110 text-primary' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
