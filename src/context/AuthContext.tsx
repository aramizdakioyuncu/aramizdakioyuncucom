'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/models';
import { userList } from '@/lib/constants/seedData';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Check local storage for persistent login
    const savedUserStr = localStorage.getItem('armoyu_user');
    
    if (savedUserStr) {
      try {
        const savedData = JSON.parse(savedUserStr);
        const username = savedData.username;
        
        // Find user in seedData to maintain all object references (friends, groups, notifications)
        const foundUser = userList.find(u => u.username === username);
        
        if (foundUser) {
          setUser(foundUser);
        } else {
          // If not in seedData (unlikely in this demo), try to use the stored JSON
          setUser(User.fromJSON(savedData));
        }
      } catch (e) {
        console.error('Failed to restore session', e);
        localStorage.removeItem('armoyu_user');
      }
    }
    
    // Explicitly set loading to false AFTER the check
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('armoyu_user', JSON.stringify({ username: userData.username }));
    setIsLoginModalOpen(false); // Close modal on success
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('armoyu_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Optionally update local storage if sensitive data changed
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
