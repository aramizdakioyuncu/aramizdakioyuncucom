'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Group, User } from '@armoyu/core';
import { 
   PageWidth, 
   GroupHeader, 
   GroupMenu, 
   GroupStatsGrid,
   GroupAboutCard,
   GroupEventsList,
   GroupFeedSection,
   GroupTopMembers,
   GroupPermissions,
   useAuth, 
   groupList,
   postList,
   eventList
} from '@armoyu/ui';
import Link from 'next/link';

export default function GroupDetailPage() {
   const { user, updateUser } = useAuth();
   const params = useParams();
   const groupId = (params?.groupId as string)?.toLowerCase();

   // Find group by id, slug, or name
   const groupRaw = groupList.find(g =>
      g.id?.toString() === groupId ||
      g.slug?.toLowerCase() === groupId ||
      g.urlName?.toLowerCase() === groupId ||
      g.name.toLowerCase() === groupId ||
      g.name.toLowerCase().replace(/\s+/g, '-') === groupId
   );

   const initialGroup = groupRaw ? (groupRaw instanceof Group ? groupRaw : new Group(groupRaw)) : null;
   const [group, setGroup] = useState<Group | null>(initialGroup);
   const [localEvents, setLocalEvents] = useState<any[]>(eventList.slice(0, 3));

   // Local membership state
   const initialIsMember = user && initialGroup ? initialGroup.members.some(m => m.username === user.username) : false;
   const [isMember, setIsMember] = useState(initialIsMember);

   // Group Admin Check
   const isGroupAdmin = user && initialGroup && (
      initialGroup.owner?.displayName === user.displayName ||
      initialGroup.members.some(m => m.username === user.username && (m.role?.id === 'admin' || m.role?.id === 'member_mgmt'))
   );

   if (!group) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] bg-armoyu-bg text-armoyu-text">
            <h2 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">Grup bulunamadı</h2>
            <Link href="/gruplar" className="text-blue-500 hover:underline uppercase italic font-black text-sm tracking-widest">Gruplara geri dön</Link>
         </div>
      );
   }

   const handleJoin = () => {
      if (!user) return alert('Lütfen önce giriş yapın!');
      setIsMember(true);
      group.members.push(user);
      group.memberCount = group.members.length;
      setGroup(new Group(group));
      // update user groups
      const updatedUser = new User({ ...user });
      updatedUser.groups = [...(updatedUser.groups || []), {
         name: group.name, shortName: group.shortName, logo: group.logo, role: 'Üye'
      }];
      updateUser(updatedUser);
   };

   const handleLeave = () => {
      if (!confirm('Gruptan ayrılmak istediğinize emin misiniz?')) return;
      setIsMember(false);
      group.members = group.members.filter(m => m.username !== user?.username);
      group.memberCount = group.members.length;
      setGroup(new Group(group));
      if (user) {
         const updatedUser = new User({ ...user });
         updatedUser.groups = updatedUser.groups?.filter(g => g.name !== group.name);
         updateUser(updatedUser);
      }
   };

   const groupPosts = postList.filter(p =>
      p.hashtags?.some(h => h.toLowerCase() === group.name.toLowerCase() || h.toLowerCase() === group.shortName.toLowerCase())
   );

   const stats = {
      members: group.memberCount || group.members.length,
      online: Math.floor((group.memberCount || group.members.length) * 0.15),
      posts: groupPosts.length + Math.floor(Math.random() * 50),
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
               <GroupAboutCard description={group.description} />
               <GroupEventsList 
                  events={localEvents} 
                  setEvents={setLocalEvents} 
                  isGroupAdmin={!!isGroupAdmin} 
               />
               <GroupFeedSection 
                  group={group as any} 
                  user={user as any} 
                  isMember={isMember} 
                  posts={groupPosts} 
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
