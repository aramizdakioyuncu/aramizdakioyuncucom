'use client';

import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PageWidth } from '@/components/shared/PageWidth';
import { PostCard } from '@/components/modules/auth/PostCard';
import Link from 'next/link';

// Mock detailed group data
const GROUP_DATA_MOCK = {
  name: 'Grup Adı',
  shortName: 'TAG',
  description: 'Bu grup ARMOYU topluluğunun bir parçasıdır. Grup üyeleri burada paylaşımlar yapar ve etkinlikler düzenler.',
  recruitment: 'Alım Açık',
  date: '01.01.2024',
  category: 'Topluluk',
  tag: 'Genel',
  banner: 'https://images.unsplash.com/photo-1587573089734-09cb6960951b?q=80&w=2672&auto=format&fit=crop',
  logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Armoyu',
  stats: {
    members: 150,
    online: 12,
    posts: 420,
    founded: '2024'
  },
  members: [
    { name: 'Berkay Tikenoğlu', role: 'Kurucu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' },
    { name: 'MythX', role: 'Yönetici', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX' }
  ]
};

const MOCK_POSTS = [
  { 
    id: '1', 
    author: {
      name: 'Grup Yöneticisi',
      username: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      verified: true
    }, 
    createdAt: '2 saat önce', 
    content: 'Grubumuza yeni üyeler katıldı, hoş geldiniz!', 
    stats: {
      likes: 45,
      comments: 4,
      shares: 2
    }
  }
];

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  
  // In a real app, you would fetch data based on groupId
  // For now, we use RIHTIM data if it matches, otherwise generic
  const data = (groupId === 'rihtim' || groupId === 'RIHTIM') ? {
    ...GROUP_DATA_MOCK,
    name: 'RIHTIM',
    shortName: 'RTM',
    description: 'Denizin verdiği huzur ile içinizi ferahlatacak bir yaşam sizi bekliyor. Topluluğumuzda huzur ve eğlence bir arada. Minecraft sunucumuzda en büyük yapıları inşa eden, düzenli etkinlikler düzenleyen ve samimi bir ortam sunan köklü bir klanız.',
    recruitment: '16 Alım Açık',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Rihtim',
    stats: { members: 1240, online: 85, posts: 3420, founded: '2022' }
  } : GROUP_DATA_MOCK;

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
                  {MOCK_POSTS.map(post => (
                    <PostCard key={post.id} {...post} />
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-10">
            {/* Top Members */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-8 uppercase tracking-widest">ÖNE ÇIKAN ÜYELER</h4>
               <div className="space-y-6">
                  {data.members.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                       <img src={member.avatar} className="w-12 h-12 rounded-2xl border border-blue-500/20 group-hover:scale-105 transition-transform" />
                       <div>
                          <p className="text-sm font-black text-armoyu-text mb-0.5 group-hover:text-blue-500 transition-colors uppercase">{member.name}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${idx === 0 ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>{member.role}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
