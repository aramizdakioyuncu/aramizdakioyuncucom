'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { PageWidth } from '@/components/shared/PageWidth';
import { PostCard } from '@/components/modules/auth/PostCard';
import Link from 'next/link';
import { userList, postList, groupList } from '@/lib/constants/seedData';
import { useAuth } from '@/context/AuthContext';
import { Group } from '@/models/community/Group';
import { User } from '@/models/auth/User';
import { GroupMenu } from '@/components/modules/community/GroupMenu';
import { GroupHeader } from '@/components/modules/community/GroupHeader';

export default function GroupDetailPage() {
  const { user, updateUser } = useAuth();
  const params = useParams();
  const groupId = (params?.groupId as string)?.toLowerCase();
  
  // Find group by slug or name and ensuring it's a Group instance
  const groupRaw = groupList.find(g => 
    g.slug === groupId || 
    g.name.toLowerCase() === groupId ||
    g.name.toLowerCase().replace(/\s+/g, '-') === groupId
  );

  const initialGroup = groupRaw ? (groupRaw instanceof Group ? groupRaw : new Group(groupRaw)) : null;
  const [group, setGroup] = useState<Group | null>(initialGroup);
  
  // Local membership state to mock backend updates
  const initialIsMember = user && initialGroup ? initialGroup.members.some(m => m.username === user.username) : false;
  const [isMember, setIsMember] = useState(initialIsMember);

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-armoyu-bg text-armoyu-text">
        <h2 className="text-2xl font-bold mb-4">Grup bulunamadı</h2>
        <Link href="/gruplar" className="text-blue-500 hover:underline">Gruplara geri dön</Link>
      </div>
    );
  }

  // Handlers for Group Actions
  const handleJoin = () => {
    if (!user) return alert('Lütfen önce giriş yapın!');
    
    // 1. Update local page state
    setIsMember(true);
    group.members.push(user);
    group.memberCount = group.members.length;
    setGroup(new Group(group));

    // 2. Update global auth user state (for drawer/sidebar)
    const updatedUser = new User({ ...user });
    updatedUser.groups = [...(updatedUser.groups || []), {
      name: group.name,
      shortName: group.shortName,
      logo: group.logo,
      role: 'Üye'
    }];
    updateUser(updatedUser);
  };

  const handleLeave = () => {
    if (!confirm('Gruptan ayrılmak istediğinize emin misiniz?')) return;
    
    // 1. Update local page state
    setIsMember(false);
    group.members = group.members.filter(m => m.username !== user?.username);
    group.memberCount = group.members.length;
    setGroup(new Group(group));

    // 2. Update global auth user state (for drawer/sidebar)
    if (user) {
      const updatedUser = new User({ ...user });
      updatedUser.groups = updatedUser.groups?.filter(g => g.name !== group.name);
      updateUser(updatedUser);
    }
  };

  const handleReport = () => {
    alert('Şikayetiniz ARMOYU moderatörlerine iletildi. İnceleme sonrası size bildirim gönderilecektir.');
  };

  // Filter posts for this group
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
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Reusable Group Header */}
      <GroupHeader 
        group={group} 
        isMember={isMember} 
        onJoin={handleJoin}
        onLeave={handleLeave}
        onReport={handleReport}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         
         {/* Main Content */}
         <div className="xl:col-span-3 space-y-12">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: 'ÜYELER', value: stats.members, icon: 'users' },
                 { label: 'AKTİF', value: stats.online, icon: 'activity', color: 'text-emerald-500' },
                 { label: 'PAYLAŞIM', value: stats.posts, icon: 'edit-3' },
                 { label: 'KURULUŞ', value: stats.founded, icon: 'calendar' }
               ].map((stat, idx) => (
                 <div key={idx} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg text-center">
                    <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.color || 'text-armoyu-text'}`}>{stat.value}</p>
                 </div>
               ))}
            </div>

            {/* Description */}
            <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight mb-6 italic">GRUP HAKKINDA</h3>
               <p className="text-armoyu-text-muted text-lg leading-relaxed font-medium">
                  {group.description}
               </p>
            </div>

            {/* Feed Section */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP PAYLAŞIMLARI</h3>
               </div>
               
               {/* Create Post Field (Member Only) */}
               {isMember && user && (
                <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex gap-5 items-center">
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="w-14 h-14 rounded-2xl border-2 border-blue-500/20 shadow-lg object-cover"
                    />
                    <div className="flex-1 relative group">
                      <input 
                        type="text" 
                        placeholder={`${group.name} grubunda neler oluyor?`} 
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/30 rounded-2xl px-6 py-4 text-sm text-armoyu-text placeholder-armoyu-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <button className="p-2 text-armoyu-text-muted hover:text-blue-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-emerald-500/10 text-[10px] font-black text-armoyu-text-muted hover:text-emerald-500 transition-all">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        MEDYA EKLE
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-500/10 text-[10px] font-black text-armoyu-text-muted hover:text-blue-500 transition-all">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        ETİKETLE
                      </button>
                    </div>
                    <button className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                      PAYLAŞ
                    </button>
                  </div>
                </div>
               )}

               <div className="space-y-6">
                  {groupPosts.map(post => (
                    <PostCard key={post.id} {...post} />
                  ))}
                  {groupPosts.length === 0 && (
                    <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-armoyu-card-border">
                       <p className="text-armoyu-text-muted font-bold opacity-60">Henüz bu grupta paylaşım yapılmamış.</p>
                    </div>
                  )}
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-10">
            {/* Group Menu Sidebar (Member Only) */}
            {isMember && user && (
               <div className="xl:col-span-1 py-2">
                  <GroupMenu group={group} user={user} onLeave={handleLeave} />
               </div>
            )}
            {/* Top Members */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xs font-black text-armoyu-text uppercase tracking-widest">ÖNE ÇIKAN ÜYELER</h4>
                  <Link href={`${group.getGroupUrl()}/uyeler`} className="text-[10px] font-black text-blue-500 uppercase hover:underline">TÜMÜ</Link>
               </div>
               <div className="space-y-6">
                  {(group.members || []).slice(0, 10).map((member, idx) => (
                    <Link key={idx} href={`/oyuncular/${member.username}`} className="flex items-center gap-4 group cursor-pointer">
                       <img src={member.avatar} className="w-12 h-12 rounded-2xl border border-blue-500/20 group-hover:scale-105 transition-transform" alt="Avatar" />
                       <div>
                          <p className="text-sm font-black text-armoyu-text mb-0.5 group-hover:text-blue-500 transition-colors uppercase">{member.displayName}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${idx === 0 ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>{member.role?.name || 'Üye'}</p>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>

            {/* Group Permissions */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-8 uppercase tracking-widest">GRUP YETKİLERİ</h4>
               <div className="space-y-3">
                  {(group.permissions || []).map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="text-[10px] font-black text-armoyu-text uppercase tracking-wider">{perm.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                  {(group.permissions?.length || 0) === 0 && (
                     <p className="text-[10px] text-armoyu-text-muted italic opacity-60">Bu grup için özel yetki tanımlanmamış.</p>
                  )}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
