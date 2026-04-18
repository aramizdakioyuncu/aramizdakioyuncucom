'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  ProfileHeader, 
  ProfileStats, 
  ProfileSidebar, 
  ProfileTabsArea, 
  useAuth, 
  useArmoyu, 
  userList
} from '@armoyu/ui';

export default function UserProfilePage() {
  const { user, isLoading, setIsLoginModalOpen } = useAuth();
  const { api } = useArmoyu();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !user) {
      setIsLoginModalOpen(true);
    }
  }, [user, isLoading, setIsLoginModalOpen]);

  const username = (params?.username as string) || 'oyuncu';
  const urlName = searchParams?.get('name');
  const urlAvatar = searchParams?.get('avatar');
  const urlBadge = searchParams?.get('badge');

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
    const timer = setTimeout(() => {
      setMockUser(prev => ({
        ...prev,
        name: prev.name === 'Yükleniyor...' ? (username.charAt(0).toUpperCase() + username.slice(1)) : prev.name
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, [username]);

  const targetUser = userList.find(u => u.username === username);
  const isOwnProfile = user?.username === username;
  const displayUser = isOwnProfile ? user : targetUser;

  // Profil İçeriği Kontrol State'leri
  const [activeTab, setActiveTab] = useState('Kariyer');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);

  // Arkadaşlık State'leri
  const [friends, setFriends] = useState<any[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [hasFetchedFriends, setHasFetchedFriends] = useState(false);
  const [friendsPage, setFriendsPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  const fetchFriends = async (isLoadMore = false) => {
    if (!displayUser?.id) return;
    
    setIsLoadingFriends(true);
    try {
      const targetPage = isLoadMore ? friendsPage + 1 : 1;
      const data = await api.users.getFriendsList(targetPage, { 
        userId: Number(displayUser.id),
        limit: 20 
      });
      
      if (data && Array.isArray(data)) {
        const mappedFriends = data.map((u: any) => ({ ...u }));
        if (isLoadMore) {
          setFriends(prev => [...prev, ...mappedFriends]);
        } else {
          setFriends(mappedFriends);
        }
        setFriendsPage(targetPage);
        setHasMoreFriends(mappedFriends.length > 0);
        setHasFetchedFriends(true);
      } else {
        setHasMoreFriends(false);
      }
    } catch (error) {
      console.error('[UserProfilePage] Friends fetch error:', error);
    } finally {
      setIsLoadingFriends(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Arkadaşlar' && !hasFetchedFriends) {
      fetchFriends(false);
    }
  }, [activeTab, hasFetchedFriends, displayUser?.id, api]);

  return (
    <main className="min-h-screen pt-4 pb-12 w-full animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Banner & Header */}
        <ProfileHeader user={displayUser || mockUser} isOwnProfile={isOwnProfile} />

        {/* Quick Stats */}
        <ProfileStats user={(displayUser || mockUser) as any} />

        {/* 
           Sidebar & Content Layout (Sekmeler ve Akış)
           Grid yapısı artık ana projede (page.tsx) olduğu için
           tam olarak isteğe göre şekillendirilebilir.
        */}
        <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-80 shrink-0">
             <ProfileSidebar 
               displayUser={displayUser || null} 
               isOwnProfile={isOwnProfile}
               friends={friends}
               onManageCloud={() => setIsCloudModalOpen(true)}
               onSeeAllFriends={() => setActiveTab('Arkadaşlar')}
             />
          </div>
          
          <div className="flex-1 min-w-0">
             <ProfileTabsArea 
               displayUser={displayUser || null} 
               isOwnProfile={isOwnProfile}
               activeTab={activeTab}
               setActiveTab={setActiveTab}
               friends={friends}
               hasMoreFriends={hasMoreFriends}
               isLoadingFriends={isLoadingFriends}
               onLoadMoreFriends={() => fetchFriends(true)}
             />
          </div>
        </div>

      </div>
    </main>
  );
}
