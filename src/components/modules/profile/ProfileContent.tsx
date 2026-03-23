'use client';

import React, { useState } from 'react';
import { PostCard } from '../auth/PostCard';
import { CloudStorageModal } from './CloudStorageModal';

const MOCK_PROFILE_POSTS = [
  {
    id: 'p1',
    author: {
      name: 'Berkay',
      username: 'berkaytikeno',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
      badge: 'KURUCU'
    },
    content: 'Yeni profil tasarımı testleri devam ediyor. Kullanıcı arayüzü gerçekten harika oldu, ellerinize sağlık ekip! 🚀',
    createdAt: '3 saat önce',
    stats: { likes: 350, comments: 45, reposts: 12, shares: 8 }
  },
  {
    id: 'p2',
    author: {
      name: 'Berkay',
      username: 'berkaytikeno',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
      badge: 'KURUCU'
    },
    content: 'Bu hafta sonu dev bir ARMOYU turnuvası yapmayı planlıyoruz. Katılmak isteyenler bu gönderiyi beğenebilir mi?',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
    createdAt: '1 gün önce',
    stats: { likes: 1240, comments: 380, reposts: 154, shares: 45 }
  }
];

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState('Gönderiler');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const tabs = ['Gönderiler', 'Hakkında', 'Oynadığı Oyunlar', 'Arkadaşlar'];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">
      
      {/* Sol Panel: Hakkında Özeti */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-black text-armoyu-text mb-4">Hakkında</h3>
          <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-6">
            Selam, ben Berkay. ARMOYU projesinin kurucusuyum. Genelde rekabetçi FPS oyunları oynarım ve yeni teknolojiler ile ilgilenirim.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Konum</div>
                <div className="text-sm font-bold text-armoyu-text">İstanbul, Türkiye</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Katılım Tarihi</div>
                <div className="text-sm font-bold text-armoyu-text">Ağustos 2018</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Ana Platform</div>
                <div className="text-sm font-bold text-armoyu-text">PC (Steam)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rozetler Vitrini */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block">
          <h3 className="text-lg font-black text-armoyu-text mb-4">Rozetler</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-red-500/20">Kurucu</span>
            <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20">5 Yıllık Üye</span>
            <span className="bg-purple-500/10 text-purple-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-500/20">Turnuva Şampiyonu</span>
            <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-yellow-500/20">Premium</span>
          </div>
        </div>

        {/* Cloud Depolama Temsili Kutusu */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-black text-armoyu-text flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
               ARMOYU Cloud
             </h3>
             <span className="text-xs font-bold text-armoyu-text-muted">48%</span>
          </div>
          
          <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-3 shadow-inner">
             <div className="w-[48%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
          </div>
          
          <p className="text-xs font-medium text-armoyu-text-muted mb-4">
            5 GB alanın <span className="font-bold text-armoyu-text">2.4 GB</span> kadarı hesaba yedeklendi.
          </p>

          <button 
            onClick={() => setIsCloudModalOpen(true)}
            className="w-full py-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors border border-blue-500/10"
          >
            Depolamayı Yönet
          </button>
        </div>
      </div>

      {/* Sağ Panel: İçerik ve Sekmeler */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        
        {/* Modern Tabs */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl p-2 shadow-sm overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                  : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab İçerikleri */}
        {activeTab === 'Gönderiler' && (
          <div className="space-y-6">
            <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-5 shadow-sm">
               <div className="flex gap-4">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 shrink-0 object-cover" alt="Avatar"/>
                 <input type="text" placeholder="Profiline sabit bir gönderi yaz..." className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-armoyu-text placeholder:text-armoyu-text-muted" />
               </div>
            </div>

            {MOCK_PROFILE_POSTS.map(post => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        )}

        {activeTab !== 'Gönderiler' && (
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-armoyu-text-muted mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 className="text-xl font-bold text-armoyu-text mb-2">Bu alan henüz yapım aşamasında</h3>
            <p className="text-armoyu-text-muted text-sm max-w-sm">"{activeTab}" sekmesine ait içerikler yakında eklenecek. Sabrınız için teşekkür ederiz.</p>
          </div>
        )}

      </div>

      <CloudStorageModal isOpen={isCloudModalOpen} onClose={() => setIsCloudModalOpen(false)} />
    </div>
  );
}
