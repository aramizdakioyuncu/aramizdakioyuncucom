'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageWidth } from '@/components/shared/PageWidth';
import { PostCard } from '@/components/modules/auth/PostCard';
import Link from 'next/link';
import { userList, postList, groupList } from '@/lib/constants/seedData';

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = (params?.groupId as string)?.toLowerCase();
  
  // Find group by slug or name
  const group = groupList.find(g => 
    g.slug === groupId || 
    g.name.toLowerCase() === groupId ||
    g.name.toLowerCase().replace(/\s+/g, '-') === groupId
  );

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-armoyu-bg text-armoyu-text">
        <h2 className="text-2xl font-bold mb-4">Grup bulunamadı</h2>
        <Link href="/gruplar" className="text-blue-500 hover:underline">Gruplara geri dön</Link>
      </div>
    );
  }

  // Filter posts for this group
  const groupPosts = postList.filter(p => 
    p.hashtags?.some(h => h.toLowerCase() === group.name.toLowerCase() || h.toLowerCase() === group.shortName.toLowerCase())
  );

  const data = {
    ...group,
    stats: {
      members: group.memberCount || group.members.length,
      online: Math.floor((group.memberCount || group.members.length) * 0.15),
      posts: groupPosts.length + Math.floor(Math.random() * 50), // Sample fallback
      founded: group.date?.split('.')?.[2] || '2024'
    }
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Group Header Banner */}
      <div className="relative h-64 md:h-96 rounded-[60px] overflow-hidden mb-12 shadow-2xl">
        <img src={data.banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-end justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="relative">
                 <img 
                   src={data.logo} 
                   className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] border-4 border-armoyu-bg bg-white dark:bg-zinc-900 shadow-2xl" 
                   alt="Logo" 
                 />
                 <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-xl border-4 border-armoyu-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
              </div>
              <div className="mb-2">
                 <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">{data.name}</h1>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{data.category}</span>
                 </div>
                 <p className="text-white/70 font-bold text-lg">@{data.shortName} • {data.recruitment}</p>
              </div>
           </div>
           
           <div className="flex gap-4 mb-2">
              <button className="px-8 py-4 bg-white text-blue-600 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">GRUBA KATIL</button>
              <button className="px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         
         {/* Main Content */}
         <div className="xl:col-span-3 space-y-12">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: 'ÜYELER', value: data.stats.members, icon: 'users' },
                 { label: 'AKTİF', value: data.stats.online, icon: 'activity', color: 'text-emerald-500' },
                 { label: 'PAYLAŞIM', value: data.stats.posts, icon: 'edit-3' },
                 { label: 'KURULUŞ', value: data.stats.founded, icon: 'calendar' }
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
                  {data.description}
               </p>
            </div>

            {/* Feed Section */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP PAYLAŞIMLARI</h3>
               </div>
               
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
            {/* Top Members */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-8 uppercase tracking-widest">ÖNE ÇIKAN ÜYELER</h4>
               <div className="space-y-6">
                  {(data.members || []).slice(0, 10).map((member, idx) => (
                    <Link key={idx} href={`/oyuncular/${member.username}`} className="flex items-center gap-4 group cursor-pointer">
                       <img src={member.avatar} className="w-12 h-12 rounded-2xl border border-blue-500/20 group-hover:scale-105 transition-transform" />
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
                  {(data.permissions || []).map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="text-[10px] font-black text-armoyu-text uppercase tracking-wider">{perm.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                  {(data.permissions?.length || 0) === 0 && (
                     <p className="text-[10px] text-armoyu-text-muted italic opacity-60">Bu grup için özel yetki tanımlanmamış.</p>
                  )}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
