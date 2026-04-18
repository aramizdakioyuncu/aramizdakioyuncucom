'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
   PageWidth, 
   GroupHeader, 
   GroupMenu, 
   GroupStatsGrid,
   GroupAboutCard,
   EventListWidget,
   GroupFeedSection,
   GroupTopMembers,
   GroupPermissions,
   useAuth, 
   useArmoyu,
   Group,
   NotFound
} from '@armoyu/ui';
import Link from 'next/link';

export default function GroupDetailPage() {
   const { user } = useAuth();
   const { ui } = useArmoyu();
   const params = useParams();
   const groupIdParam = params?.groupId as string;

   const [group, setGroup] = useState<Group | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [localEvents, setLocalEvents] = useState<any[]>([]);

   useEffect(() => {
      async function fetchGroupDetail() {
         if (!ui || !groupIdParam) return;

         setIsLoading(true);
         setError(null);

         try {
            const response = await ui.api.groups.getGroupDetail({
               groupId: isNaN(Number(groupIdParam)) ? undefined : Number(groupIdParam),
               groupName: isNaN(Number(groupIdParam)) ? groupIdParam : undefined
            });

            if (response && response.durum === 1 && response.icerik) {
               const mappedGroup = Group.fromAPI(response.icerik);
               setGroup(mappedGroup);
            } else {
               setError(response?.aciklama || 'Grup bilgileri yüklenirken bir hata oluştu.');
            }
         } catch (err) {
            console.error('[GroupDetailPage] API Error:', err);
            setError('Sunucuya bağlanırken bir hata oluştu.');
         } finally {
            setIsLoading(false);
         }
      }

      fetchGroupDetail();
   }, [ui, groupIdParam]);

   const isMember = user && group ? group.members.some(m => String(m.id) === String(user.id)) : false;

   const isGroupAdmin = user && group && (
      String(group.owner?.id) === String(user.id) ||
      group.moderators.some(m => String(m.id) === String(user.id))
   );

   const handleJoin = async () => {
      alert('Bu grup için katılım işlemleri şu an sadece davetiye ile yapılabilmektedir.');
   };

   const handleLeave = async () => {
      if (!confirm('Gruptan ayrılmak istediğinize emin misiniz?')) return;
      try {
         const response = await ui.api.groups.leaveGroup(Number(group!.id));
         if (response && response.durum === 1) {
            // Re-fetch to update state
            const groupRes = await ui.api.groups.getGroupDetail({ groupId: Number(group!.id) });
            if (groupRes.icerik) setGroup(Group.fromAPI(groupRes.icerik));
         } else {
            alert(response?.aciklama || 'Gruptan ayrılamadınız.');
         }
      } catch (err) {
         alert('İşlem sırasında bir hata oluştu.');
      }
   };

   if (isLoading) {
      return (
         <div className="pb-20 animate-in fade-in duration-700">
            <PageWidth width="max-w-[1440px]" />
            <div className="h-64 bg-black/5 dark:bg-white/5 rounded-[40px] animate-pulse mb-12" />
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
               <div className="xl:col-span-3 space-y-12">
                  <div className="h-40 bg-black/5 dark:bg-white/5 rounded-[40px] animate-pulse" />
                  <div className="h-60 bg-black/5 dark:bg-white/5 rounded-[40px] animate-pulse" />
               </div>
               <div className="xl:col-span-1 space-y-10">
                  <div className="h-80 bg-black/5 dark:bg-white/5 rounded-[40px] animate-pulse" />
               </div>
            </div>
         </div>
      );
   }

   if (error || !group) {
      return (
         <NotFound 
            title={error || "Grup Bulunamadı"} 
            message="Ulaşmaya çalıştığınız grup ARMOYU dünyasında mevcut olmayabilir veya henüz kurulmamış olabilir." 
            actionHref="/gruplar"
            actionText="Gruplara Geri Dön"
         />
      );
   }

   const stats = {
      members: group.memberCount || 0,
      online: Math.floor((group.memberCount || 0) * 0.1),
      posts: 0, // Bu bilgi API'den ayrıca çekilebilir veya grup modeline eklenebilir
      founded: group.date?.split('.')?.[2] || '2024'
   };

   return (
      <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 relative text-left leading-none">
         <PageWidth width="max-w-[1440px]" />

         {/* 1. Header (Kapak, İsim, Katıl Butonları) */}
         <GroupHeader
            group={group as any}
            isMember={isMember}
            onJoin={handleJoin}
            onLeave={handleLeave}
            onReport={() => alert('Şikayet iletildi.')}
         />

         {/* 2. Grid Sistemi ve Sayfa Düzeni Burada */}
         <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
            
            {/* Sol / Ana İçerik Bloğu (3/4) */}
            <div className="xl:col-span-3 space-y-12">
               <GroupStatsGrid stats={stats} />
               <GroupAboutCard description={group.description || ''} />
              <EventListWidget 
                  events={localEvents} 
                  setEvents={setLocalEvents} 
                  isOwner={!!isGroupAdmin}
                  title="Etkinlikler"
               />
               <GroupFeedSection 
                  group={group as any} 
                  user={user as any} 
                  isMember={isMember} 
                  posts={[]} // API'den çekilecek
               />
            </div>

            {/* Sağ Sidebar (1/4) */}
            <div className="space-y-10 xl:col-span-1">
               {isMember && user && (
                  <div className="py-2">
                     <GroupMenu group={group as any} user={user as any} onLeave={handleLeave} />
                  </div>
               )}
               <GroupTopMembers members={group.members || []} groupUrl={group.getGroupUrl()} />
               <GroupPermissions permissions={group.permissions || []} />
            </div>

         </div>
      </div>
   );
}
