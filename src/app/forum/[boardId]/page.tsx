'use client';

import React, { useState } from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import { TopicItem } from '@/components/modules/forum/TopicItem';
import { NewTopicModal } from '@/components/modules/forum/NewTopicModal';
import Link from 'next/link';
import { MOCK_FORUM_TOPICS } from '@/lib/constants/seedData';

export default function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const resolvedParams = React.use(params);
  const boardId = resolvedParams.boardId;
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const boardName = boardId.charAt(0).toUpperCase() + boardId.slice(1);
  
  const boardTopics = MOCK_FORUM_TOPICS.filter(t => t.boardId === boardId);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <NewTopicModal 
        isOpen={isNewTopicModalOpen} 
        onClose={() => setIsNewTopicModalOpen(false)} 
        defaultBoard={boardName}
      />

      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
         <Link href="/forum" className="hover:text-blue-500">FORUM</Link>
         <span>/</span>
         <span className="text-blue-500">{boardName}</span>
      </div>

      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic">{boardName} SUNUCUSU</h1>
            <p className="text-armoyu-text-muted text-lg font-medium opacity-80">{boardName} dünyasındaki tüm gelişmeler ve topluluk etkileşimi.</p>
         </div>
         <button 
           onClick={() => setIsNewTopicModalOpen(true)}
           className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
         >
            YENİ KONU AÇ
         </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         
         <div className="xl:col-span-3 space-y-8">
            
            {/* Topic Filter Tabs */}
            <div className="flex gap-4 border-b border-armoyu-card-border pb-4">
               <button className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">HEPSİ</button>
               <button className="px-6 py-2 bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-blue-500 transition-colors">POPÜLER</button>
               <button className="px-6 py-2 bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-blue-500 transition-colors">ÇÖZÜLDÜ</button>
            </div>

            {/* Topic List */}
            <div className="space-y-4">
               {boardTopics.length > 0 ? boardTopics.map((topic) => (
                  <TopicItem key={topic.id} {...topic} />
               )) : (
                 <div className="p-8 text-center glass-panel rounded-2xl border border-armoyu-card-border bg-armoyu-card-bg">
                    <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest">Bu kategoriye henüz konu açılmamış.</p>
                 </div>
               )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
               <div className="flex gap-2">
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-xl font-black text-xs">1</button>
                  <button className="w-10 h-10 bg-black/5 dark:bg-white/5 text-armoyu-text-muted rounded-xl font-black text-xs hover:text-blue-500">2</button>
                  <button className="w-10 h-10 bg-black/5 dark:bg-white/5 text-armoyu-text-muted rounded-xl font-black text-xs hover:text-blue-500">3</button>
                  <button className="px-4 h-10 bg-black/5 dark:bg-white/5 text-armoyu-text-muted rounded-xl font-black text-xs hover:text-blue-500 uppercase tracking-widest">SONRAKİ</button>
               </div>
            </div>
         </div>

         <div className="space-y-10">
            {/* Board Rules */}
            <div className="glass-panel p-8 rounded-[40px] border border-blue-500/20 bg-blue-600/5">
               <h4 className="text-xs font-black text-blue-500 mb-6 uppercase tracking-widest">SUNUCU KURALLARI</h4>
               <ul className="space-y-4">
                  <li className="flex gap-3 text-xs font-medium text-armoyu-text leading-relaxed">
                     <span className="text-blue-500 font-bold">1.</span> Reklam yapmak kesinlikle yasaktır.
                  </li>
                  <li className="flex gap-3 text-xs font-medium text-armoyu-text leading-relaxed">
                     <span className="text-blue-500 font-bold">2.</span> Diğer üyelere saygılı davranın.
                  </li>
                  <li className="flex gap-3 text-xs font-medium text-armoyu-text leading-relaxed">
                     <span className="text-blue-500 font-bold">3.</span> Konularınızı doğru kategoriye açın.
                  </li>
               </ul>
            </div>

            {/* Top Posters */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">EN AKTİF ÜYELER</h4>
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 55}`} className="w-10 h-10 rounded-full border border-blue-500/20" />
                       <div>
                          <p className="text-xs font-black text-armoyu-text mb-0.5">Üye Adı {i}</p>
                          <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest">{i * 120} MESAJ</p>
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
