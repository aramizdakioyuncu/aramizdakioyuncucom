'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ProfileHeader } from '@/components/modules/profile/ProfileHeader';
import { ProfileStats } from '@/components/modules/profile/ProfileStats';
import { ProfileContent } from '@/components/modules/profile/ProfileContent';
import { useAuth } from '@/context/AuthContext';

export default function UserProfilePage() {
  const { user, setIsLoginModalOpen } = useAuth();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user) {
      setIsLoginModalOpen(true);
    }
  }, [user, setIsLoginModalOpen]);

  const username = (params?.username as string) || 'oyuncu';
  const urlName = searchParams?.get('name');
  const urlAvatar = searchParams?.get('avatar');
  const urlBadge = searchParams?.get('badge');

  // URL üzerinden gelen önbellek verileri ile Hızlı Yükleme (Optimistic UI) hissi verilir.
  const [mockUser, setMockUser] = useState({
    name: urlName || 'Yükleniyor...',
    username: username,
    avatar: urlAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    banner: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop',
    badge: urlBadge || '',
    socials: {
      discord: 'https://discord.com',
      steam: 'https://steamcommunity.com',
      instagram: 'https://instagram.com'
    }
  });

  useEffect(() => {
    // API yükleniyor simülasyonu (Veritabanından veriyi çekme süresi)
    // Eğer tıklanılan yerde "name" URL parametresi eksikse "Yükleniyor..." da takılı kalmasını engeller.
    const timer = setTimeout(() => {
      setMockUser(prev => ({
        ...prev,
        name: prev.name === 'Yükleniyor...' ? (username.charAt(0).toUpperCase() + username.slice(1)) : prev.name
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, [username]);

  const isOwnProfile = username === 'berkaytikeno'; // Mock Authorization

  return (
    <main className="min-h-screen pt-4 pb-12 w-full animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Banner & Header (Kapak resmi, avatar, butonlar) */}
        <ProfileHeader user={mockUser} isOwnProfile={isOwnProfile} />

        {/* Quick Stats & Level (Bar Göstergeleri) */}
        <ProfileStats />

        {/* Sidebar & Content Layout (Sekmeler ve Akış) */}
        <ProfileContent />

      </div>
    </main>
  );
}
