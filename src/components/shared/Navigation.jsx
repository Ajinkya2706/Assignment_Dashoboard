import React from 'react';
import { LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';

export const Navigation = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-black border-b-2 border-black sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border-2 border-white">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AssignHub</h1>
              <p className="text-xs text-gray-300">{user?.name}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={logout} className="text-white hover:bg-gray-900">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};


