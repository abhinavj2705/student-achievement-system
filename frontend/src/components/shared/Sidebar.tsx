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
  { name: 'Reports', href: '/faculty/reports', icon: FileBarChart, roles: [UserRole.FACULTY] },

  // Admin specific
  { name: 'Users', href: '/admin/users', icon: Users, roles: [UserRole.ADMIN] },
  { name: 'Departments', href: '/admin/departments', icon: Building, roles: [UserRole.ADMIN] },
  { name: 'Reports', href: '/admin/reports', icon: FileBarChart, roles: [UserRole.ADMIN] },
  { name: 'Audit', href: '/admin/audit-logs', icon: History, roles: [UserRole.ADMIN] },
];

export function Sidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();
  const filteredItems = sidebarItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-background h-screen sticky top-0 flex flex-col hidden md:flex shrink-0">
      <div className="p-6 flex flex-col">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-8">
          <GraduationCap className="w-6 h-6" />
          <span>EduPortal</span>
        </h2>
        
        {/* Create Button */}
        {userRole === UserRole.STUDENT && (
          <Link href="/student/achievements/new" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary rounded-xl text-white shadow-sm hover:bg-primary/90 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            <span>Create New</span>
          </Link>
        )}
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
  );
}
