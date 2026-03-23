'use client';

import React from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import { ForumBoard } from '@/components/modules/forum/ForumBoard';
import { NewTopicModal } from '@/components/modules/forum/NewTopicModal';
import { useState } from 'react';

const FORUM_CATEGORIES = [
  {
    title: 'ARMOYU TOPLULUĞU',
    boards: [
      { id: 'duyurular', name: 'Duyurular & Haberler', desc: 'ARMOYU hakkında en güncel haberler ve resmi duyurular.', topicCount: 124, postCount: 2540, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> },
      { id: 'kurallar', name: 'Kurallar & Rehberler', desc: 'Topluluğumuzda uymanız gereken kurallar ve kullanım rehberleri.', topicCount: 12, postCount: 150, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg> }
    ]
  },
  {
    title: 'OYUN DÜNYASI',
    boards: [
      { id: 'minecraft', name: 'Minecraft', desc: 'Minecraft sunucularımız, buildler ve teknik destek.', topicCount: 540, postCount: 8400, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>, lastPost: { topicTitle: 'Sunucuya nasıl girerim?', author: 'MinecraftMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MC', time: '10 dk önce' } },
      { id: 'csgo', name: 'Counter-Strike', desc: 'CS2 taktikleri, skin piyasası ve topluluk maçları.', topicCount: 320, postCount: 4200, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg> },
      { id: 'assetto', name: 'Assetto Corsa', desc: 'Simülasyon dünyası, modlar ve drift etkinlikleri.', topicCount: 210, postCount: 1800, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M12 2a10 10 0 1 0 10 10"></path></svg> }
    ]
  },
  {
    title: 'YAZILIM VE TEKNOLOJİ',
    boards: [
      { id: 'web-dev', name: 'Web Geliştirme', desc: 'React, Next.js, CSS ve Web teknolojileri üzerine tartışmalar.', topicCount: 85, postCount: 740, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> },
      { id: 'python', name: 'Python & AI', desc: 'Python projeleri, veri bilimi ve yapay zeka.', topicCount: 42, postCount: 320, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2H2v10h10V2z"></path><path d="M22 12H12v10h10V12z"></path><path d="M12 12H2v10h10V12z"></path><path d="M22 2H12v10h10V2z"></path></svg> }
    ]
  }
];

export default function ForumPage() {
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <NewTopicModal 
        isOpen={isNewTopicModalOpen} 
        onClose={() => setIsNewTopicModalOpen(false)} 
      />
      
      {/* Forum Header */}
      <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic">ARMOYU FORUM</h1>
            <p className="text-armoyu-text-muted text-lg font-medium opacity-80">Topluluğun kalbi burada atıyor. Tartış, paylaş ve öğren.</p>
         </div>
            <button 
               onClick={() => setIsNewTopicModalOpen(true)}
               className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
            >
               YENİ KONU AÇ
            </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         
         {/* Main Content */}
         <div className="xl:col-span-3 space-y-16">
            {FORUM_CATEGORIES.map((category, idx) => (
              <div key={idx} className="space-y-6">
                 <div className="flex items-center gap-4 ml-4">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    <h2 className="text-sm font-black text-armoyu-text-muted uppercase tracking-[0.2em]">{category.title}</h2>
                 </div>
                 
                 <div className="space-y-4">
                    {category.boards.map((board) => (
                       <ForumBoard key={board.id} {...board} />
                    ))}
                 </div>
              </div>
            ))}
         </div>

         {/* Sidebar */}
         <div className="space-y-10">
            
            {/* Search */}
            <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-4 uppercase tracking-widest">FORUMDA ARA</h4>
               <div className="relative">
                  <input type="text" placeholder="Kelime yazın..." className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </div>
            </div>

            {/* Stats */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">İSTATİSTİKLER</h4>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-armoyu-text-muted">Toplam Üye</span>
                     <span className="text-lg font-black text-armoyu-text">1,240</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-armoyu-text-muted">Toplam Konu</span>
                     <span className="text-lg font-black text-armoyu-text">5,432</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-armoyu-text-muted">Toplam Mesaj</span>
                     <span className="text-lg font-black text-armoyu-text">42,850</span>
                  </div>
               </div>
               <div className="mt-8 pt-6 border-t border-armoyu-card-border">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Yeni Kayıt</p>
                  <div className="flex items-center gap-3">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=New" className="w-8 h-8 rounded-full" />
                     <span className="text-sm font-bold text-armoyu-text">YeniOyuncu2024</span>
                  </div>
               </div>
            </div>

            {/* Online Members */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">ÇEVRİMİÇİ ÜYELER (124)</h4>
               <div className="flex flex-wrap gap-2">
                  {[...Array(12)].map((_, i) => (
                    <img key={i} title={`Kullanıcı ${i}`} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} className="w-8 h-8 rounded-full border border-armoyu-card-border hover:scale-110 transition-transform cursor-pointer" />
                  ))}
               </div>
            </div>

         </div>

      </div>
    </div>
  );
}
