'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, User as UserIcon, LogOut, GraduationCap } from 'lucide-react';
import { User } from '@/types';

interface TopbarProps {
  user: User;
  onLogout: () => void;
}

export function Topbar({ user, onLogout }: TopbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 z-10 pt-2 border-b border-border md:border-none">
      <div className="flex items-center gap-2">
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2 text-primary font-bold">
          <GraduationCap className="w-6 h-6" />
          <span>EduPortal</span>
        </div>
        
        {/* Desktop Title */}
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-card-foreground capitalize">
            {user.role.toLowerCase()} Portal
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-4 relative">
        <button className="p-2 text-card-foreground/70 hover:bg-card-foreground/5 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
        </button>
        
        <div className="h-8 w-px bg-border mx-0 md:mx-2 hidden md:block"></div>
        
        <div className="flex items-center gap-3" ref={dropdownRef}>
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-card-foreground leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-card-foreground/60 mt-1">{user.email}</p>
          </div>
          
          {/* Profile Icon with Dropdown Toggle */}
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <UserIcon className="w-5 h-5" />
          </button>
          
          {/* Desktop standalone logout */}
          <button 
            onClick={onLogout}
            className="hidden md:block p-2 text-card-foreground/70 hover:text-danger hover:bg-danger/10 rounded-md transition-colors ml-2"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile Profile Dropdown */}
          {showDropdown && (
            <div className="absolute top-12 right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-border md:hidden">
                <p className="text-sm font-medium text-card-foreground">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-card-foreground/60 truncate">{user.email}</p>
              </div>
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors mt-1"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
