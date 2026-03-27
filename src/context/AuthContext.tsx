'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/models';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Check local storage for persistent login
    const savedUser = localStorage.getItem('armoyu_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        const userInstance = User.fromJSON(userData);
        // Delay ensures this happens after initial mount to avoid render conflict warnings
        setTimeout(() => setUser(userInstance), 0);
      } catch (e) {
        console.error('Failed to parse saved user', e);
        localStorage.removeItem('armoyu_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('armoyu_user', JSON.stringify(userData));
    setIsLoginModalOpen(false); // Close modal on success
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('armoyu_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen }}>
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
