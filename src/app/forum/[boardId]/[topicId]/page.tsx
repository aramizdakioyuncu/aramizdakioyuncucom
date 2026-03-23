'use client';

import React from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import { ForumPost } from '@/components/modules/forum/ForumPost';
import Link from 'next/link';

// Mock data for topic and posts
const TOPIC_DETAIL = {
  id: '1',
  boardId: 'minecraft',
  boardName: 'Minecraft',
  title: 'Sunucuya nasıl girerim? Adım adım rehber',
  posts: [
    {
      id: 'p1',
      author: 'Berkay Tikenoğlu',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
      authorRank: 'KURUCU',
      authorRankColor: 'red',
      authorJoined: 'HAZİRAN 2023',
      authorPosts: 1240,
      content: 'Arkadaşlar selamlar!\n\nSunucuya girmek aslında çok basit. İlk olarak Minecraft 1.20.1 sürümünü açın. Ardından sunucu ekle kısmına "play.armoyu.com" yazarak giriş yapabilirsiniz.\n\nEğer bir hata alırsanız buradan paylaşın, yardımcı olalım!',
      time: 'DÜN 14:30',
      isMainPost: true
    },
    {
      id: 'p2',
      author: 'Gamer_Ali',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali',
      authorRank: 'ÜYE',
      authorRankColor: 'gray',
      authorJoined: ' OCAK 2024',
      authorPosts: 42,
      content: 'Teşekkürler hocam, girebildim gayet akıcı!',
      time: 'DÜN 16:15'
    },
    {
      id: 'p3',
      author: 'Bey Ev',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah',
      authorRank: 'YÖNETİCİ',
      authorRankColor: 'blue',
      authorJoined: 'TEMMUZ 2023',
      authorPosts: 850,
      content: '@Gamer_Ali Rica ederiz! Sunucuda takıldığın bir şey olursa Discord üzerinden de ulaşabilirsin.',
      time: 'DÜN 18:00'
    }
  ]
};

export default function TopicDetailPage({ params }: { params: Promise<{ boardId: string, topicId: string }> }) {
  const resolvedParams = React.use(params);
  const boardId = resolvedParams.boardId;
  const topicId = resolvedParams.topicId;

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
         <Link href="/forum" className="hover:text-blue-500">FORUM</Link>
         <span>/</span>
         <Link href={`/forum/${boardId}`} className="hover:text-blue-500">{TOPIC_DETAIL.boardName}</Link>
         <span>/</span>
         <span className="text-blue-500">{TOPIC_DETAIL.title}</span>
      </div>

      {/* Topic Title */}
      <div className="mb-12">
         <h1 className="text-3xl lg:text-5xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight">
            {TOPIC_DETAIL.title}
         </h1>
      </div>

      {/* Content Area */}
      <div className="space-y-12">
         {TOPIC_DETAIL.posts.map((post) => (
            <ForumPost key={post.id} {...post} />
         ))}

         {/* Quick Reply */}
         <div className="glass-panel p-8 md:p-12 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg mt-16 shadow-2xl">
            <h3 className="text-xl font-black text-armoyu-text mb-8 uppercase tracking-tighter italic">HIZLI YANIT GÖNDER</h3>
            <div className="space-y-6">
               <textarea rows={6} className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-3xl px-6 py-5 text-armoyu-text placeholder:text-armoyu-text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm leading-relaxed" placeholder="Mesajınızı buraya yazın..." />
               <div className="flex justify-end gap-4">
                  <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                     CEVABI GÖNDER
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-20 pt-12 border-t border-armoyu-card-border flex flex-wrap gap-12 justify-center opacity-60">
          <div className="flex flex-col items-center">
             <span className="text-xs font-black text-armoyu-text uppercase tracking-widest">12 Yanıt</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-xs font-black text-armoyu-text uppercase tracking-widest">240 İzlenme</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-xs font-black text-armoyu-text uppercase tracking-widest">Bu konuyu 3 kişi görüntülüyor</span>
          </div>
      </div>

    </div>
  );
}
