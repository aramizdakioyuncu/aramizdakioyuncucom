'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  ProfileHeader, 
  ProfileStats, 
  ProfileSidebar, 
  CloudModal,
  ProfileTabsArea, 
  useAuth, 
  useArmoyu, 
  NotFound,
  ProfileSkeleton,
  OfflineNotice,
  readRecentProfiles,
  rememberProfile,
  Group,
  SoulmateSelectorModal,
  User 
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
  // Profil Verisi State'leri
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [offlineAt, setOfflineAt] = useState<number | null>(null);
  const [userGroups, setUserGroups] = useState<any[]>([]);
  const [isSoulmateOpen, setIsSoulmateOpen] = useState(false);
  // Ruh eşi / takım değişince profil yeniden çekilir
  const [profileVersion, setProfileVersion] = useState(0);
  const [activeTab, setActiveTab] = useState('Gönderiler');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);

  // Arkadaşlık State'leri
  const [friends, setFriends] = useState<any[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [hasFetchedFriends, setHasFetchedFriends] = useState(false);
  const [friendsPage, setFriendsPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Profil Verisini API'den Çekme
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username || username === 'oyuncu') return;
      
      setIsFetchingUser(true);
      setNotFound(false);
      setOfflineAt(null);
      // Daha önce açılan profil anında görünür; güncel bilgi arkadan gelir
      const recent = readRecentProfiles().find(p => p.username === username);
      setFetchedUser(recent ? User.fromAPI({ id: recent.user_id, username: recent.username, displayName: recent.display_name, avatar: recent.avatar_url }) : null);
      try {
        const result = await api.users.getUserByUsername(username);
        if (result && result.durum === 1 && result.icerik) {
          const profile = User.fromAPI(result.icerik);
          setFetchedUser(profile);
          rememberProfile({ user_id: String(profile.id), username: profile.username, display_name: profile.displayName, avatar_url: profile.avatar });
        } else if (recent && !navigator.onLine) {
          setOfflineAt(recent.at ?? Date.now());
        } else {
          setFetchedUser(null);
          setNotFound(true);
        }
      } catch (error) {
        console.error('[UserProfilePage] Profile fetch error:', error);
      } finally {
        setIsFetchingUser(false);
      }
    };

    fetchUserProfile();
  }, [username, api, profileVersion]);

  // Profilin grupları: kenar çubuğu ve "Tümünü gör" sekmesi displayUser.groups'u okur
  const profileUserId = fetchedUser?.id;
  useEffect(() => {
    setUserGroups([]);
    if (!profileUserId) return;
    // shortcut: yayınlanan @armoyu/core tiplerinde userId yalnızca sayı; yeni sürüm çıkınca cast kalkacak
    (api.groups as any).getUserGroups(profileUserId).then((response: any) => {
      const list = response.durum === 1 && Array.isArray(response.icerik) ? response.icerik : [];
      // Grup kutusu görseli avatar alanından okur
      setUserGroups(list.map((g: any) => { const group = Group.fromAPI(g); return Object.assign(group, { avatar: group.logo }); }));
    });
  }, [profileUserId, api]);

  const isOwnProfile = user?.username === username;
  // Kendi profilinde sayaçlar ziyaretten de gelir; ad ve avatar oturumdaki son halinden
  // Kendi profilinde ad / avatar oturumdan (en güncel); /me'de olmayan profil alanları profilden
  const baseUser = isOwnProfile
    ? (fetchedUser
        ? Object.assign(Object.create(Object.getPrototypeOf(fetchedUser)), fetchedUser, { ...user }, {
            bio: fetchedUser.bio,
            soulmate: fetchedUser.soulmate,
            education: fetchedUser.education,
            favoriteTeam: fetchedUser.favoriteTeam,
          })
        : user)
    : fetchedUser;
  const displayUser = baseUser && userGroups.length ? Object.assign(Object.create(Object.getPrototypeOf(baseUser)), baseUser, { groups: userGroups }) : baseUser;

  const fetchFriends = async (isLoadMore = false) => {
    if (!displayUser?.id) return;
    
    setIsLoadingFriends(true);
    try {
      const targetPage = isLoadMore ? friendsPage + 1 : 1;
      // Kimlik Phatsa'da UUID; sayıya çevrilmez
      // shortcut: yayınlanan @armoyu/core tiplerinde userId yalnızca sayı; yeni sürüm çıkınca cast kalkacak
      const d = await (api.users as any).getFriendsList(targetPage, { 
        userId: displayUser.id,
        limit: 20 
      });
      
      if (d && d.icerik && Array.isArray(d.icerik)) {
        const mappedFriends = d.icerik.map((u: any) => User.fromAPI(u));
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

  // Kenar çubuğundaki arkadaş kutusu da kullandığı için sekme beklenmeden yüklenir
  useEffect(() => {
    if (!hasFetchedFriends) fetchFriends(false);
  }, [hasFetchedFriends, displayUser?.id, api]);

  if (notFound && !isOwnProfile) return <NotFound />;

  // Mock yerine yükleme görünümü: oturum ya da profil gelene kadar
  if (!displayUser) {
    return (
      <main className="min-h-screen pt-4 pb-12 w-full">
        <ProfileSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-4 pb-12 w-full animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <OfflineNotice at={offlineAt} />

        {/* Banner & Header */}
        <ProfileHeader user={displayUser} isOwnProfile={isOwnProfile} />

        {/* Quick Stats */}
        <ProfileStats
          user={displayUser as any}
          isOwnProfile={isOwnProfile}
          onSaveBio={async (bio: string) => {
            // shortcut: yayınlanan @armoyu/core tiplerinde updateProfileChoices yok; yeni sürüm çıkınca cast kalkacak
            const response = await (api.users as any).updateProfileChoices({ bio });
            if (response.durum !== 1) {
              alert(response.aciklama || 'Kaydedilemedi.');
              return false;
            }
            setProfileVersion(v => v + 1);
            return true;
          }}
        />

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
               onSoulmateEdit={isOwnProfile ? () => setIsSoulmateOpen(true) : undefined}
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
               hasFetchedFriends={hasFetchedFriends}
               onLoadMoreFriends={() => fetchFriends(true)}
             />
          </div>
        </div>

      </div>
      <CloudModal isOpen={isCloudModalOpen} onClose={() => setIsCloudModalOpen(false)} />
      <SoulmateSelectorModal
        isOpen={isSoulmateOpen}
        onClose={() => setIsSoulmateOpen(false)}
        friends={friends}
        onSelect={async (soulmate: any) => {
          // shortcut: yayınlanan @armoyu/core tiplerinde updateProfileChoices yok; yeni sürüm çıkınca cast kalkacak
          const response = await (api.users as any).updateProfileChoices({ soulmateUserId: soulmate?.id ?? null });
          setIsSoulmateOpen(false);
          if (response.durum === 1) setProfileVersion(v => v + 1);
          else alert(response.aciklama || 'Ruh eşi kaydedilemedi.');
        }}
      />
    </main>
  );
}
