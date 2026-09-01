'use client';

import { Menu, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '@/types';

interface TopbarProps {
  user: User;
  onLogout: () => void;
}

export function Topbar({ user, onLogout }: TopbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-8 z-10 pt-2">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-card-foreground/70 hover:bg-card-foreground/5 rounded-md">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-card-foreground capitalize">
            {user.role.toLowerCase()} Portal
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-card-foreground/70 hover:bg-card-foreground/5 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
        </button>
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-card-foreground leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-card-foreground/60 mt-1">{user.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <UserIcon className="w-5 h-5" />
          </div>
          
          <button 
            onClick={onLogout}
            className="p-2 text-card-foreground/70 hover:text-danger hover:bg-danger/10 rounded-md transition-colors ml-2"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
