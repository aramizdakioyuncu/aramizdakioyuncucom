'use client';

import React, { useState } from 'react';
import { useAuth } from '@armoyu/ui';
import { 
  Send, 
  Image as ImageIcon, 
  Plus, 
  Calendar, 
  BarChart3, 
  Eye, 
  Trash2,
  Clock,
  CheckCircle2,
  Share2
} from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

interface SocialPost {
  id: string;
  platform: 'instagram' | 'twitter' | 'youtube' | 'all';
  content: string;
  status: 'yayında' | 'planlandı' | 'taslak';
  scheduledTime?: string;
  reach: string;
  createdAt: string;
}

const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'SP-1',
    platform: 'all',
    content: 'ARMOYU V3 Güncellemesi Yayında! Hemen keşfedin. #ARMOYU #V3',
    status: 'yayında',
    reach: '12.4K',
    createdAt: '2 saat önce'
  },
  {
    id: 'SP-2',
    platform: 'instagram',
    content: 'Akşamki büyük turnuvada sürpriz ödüller sizi bekliyor! 🔥',
    status: 'planlandı',
    scheduledTime: 'Bugün 19:00',
    reach: '0',
    createdAt: '1 saat önce'
  },
  {
    id: 'SP-3',
    platform: 'twitter',
    content: 'Sunucu bakımı tamamlandı, tüm sistemler aktif. İyi oyunlar!',
    status: 'yayında',
    reach: '5.2K',
    createdAt: '5 saat önce'
  }
];

export default function SocialMediaPage() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'liste' | 'yeni-paylasim'>('liste');

  // Access check: Admin or Responsible (Sorumlu)
  const isAuthorized = user && ['admin', 'responsible'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Sosyal Medya Sorumlusu veya Kurucu olmalısınız.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">SOSYAL MEDYA <span className="text-blue-500">YÖNETİMİ</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">Platform dışı duyuruları ve marka görünürlüğünü buradan yönetin.</p>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={() => setActiveView('liste')}
             className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
               activeView === 'liste' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
              LİSTE
           </button>
           <button 
             onClick={() => setActiveView('yeni-paylasim')}
             className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
               activeView === 'yeni-paylasim' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
              <Plus size={16} /> YENİ PAYLAŞIM
           </button>
        </div>
      </div>

      {activeView === 'yeni-paylasim' ? (
        <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg max-w-4xl mx-auto">
           <h3 className="text-xl font-black text-armoyu-text mb-8 uppercase tracking-tighter italic">YENİ İÇERİK OLUŞTUR</h3>
           <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                 {[
                   { id: 'insta', icon: InstagramIcon, color: 'text-pink-500 bg-pink-500/10' },
                   { id: 'tw', icon: TwitterIcon, color: 'text-blue-400 bg-blue-400/10' },
                   { id: 'yt', icon: YoutubeIcon, color: 'text-red-600 bg-red-600/10' },
                   { id: 'all', icon: Share2, color: 'text-indigo-500 bg-indigo-500/10' },
                 ].map((p) => (
                   <button key={p.id} className={`p-6 rounded-[32px] border border-white/5 flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 ${p.color}`}>
                      <p.icon />
                      <span className="text-[9px] font-black uppercase tracking-widest">Seç</span>
                   </button>
                 ))}
              </div>
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">PAYLAŞIM METNİ</label>
                 <textarea 
                   rows={6}
                   placeholder="Neler oluyor? Takipçilerine kısa bir duyuru yap..."
                   className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-header-border rounded-[32px] p-8 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                 />
              </div>

              <div className="flex items-center gap-4">
                 <button className="flex-1 py-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black/10 transition-all">
                    <ImageIcon size={18} /> GÖRSEL / VİDEO EKLE
                 </button>
                 <button className="flex-1 py-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black/10 transition-all">
                    <Calendar size={18} /> ZAMANLA
                 </button>
              </div>

              <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-widest rounded-[24px] shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2">
                 <Send size={18} /> ŞİMDİ PAYLAŞ
              </button>
           </div>
        </div>
      ) : (
        <div className="space-y-6">
           {/* Platforms Summary */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Instagram', value: '45.2K', color: 'text-pink-500', icon: InstagramIcon },
                { label: 'Twitter (X)', value: '18.4K', color: 'text-blue-500', icon: TwitterIcon },
                { label: 'YouTube', value: '124K', color: 'text-red-500', icon: YoutubeIcon },
                { label: 'Toplam Erişim', value: '1.2M', color: 'text-indigo-500', icon: BarChart3 },
              ].map((plat, i) => (
                <div key={i} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${plat.color}`}>
                      <plat.icon />
                   </div>
                   <div>
                      <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest leading-none">{plat.label}</div>
                      <div className="text-lg font-black text-armoyu-text">{plat.value}</div>
                   </div>
                </div>
              ))}
           </div>

           {/* Content List */}
           <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg">
              <div className="p-8 border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                 <h3 className="text-xs font-black text-armoyu-text-muted uppercase tracking-widest">SON PAYLAŞIMLAR</h3>
              </div>
              <div className="divide-y divide-armoyu-card-border">
                 {MOCK_SOCIAL_POSTS.map((post) => (
                   <div key={post.id} className="p-8 flex items-center justify-between hover:bg-black/[0.02] transition-colors group">
                      <div className="flex gap-6 items-start">
                         <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center text-armoyu-text shrink-0">
                            {post.platform === 'instagram' && <InstagramIcon />}
                            {post.platform === 'twitter' && <TwitterIcon />}
                            {post.platform === 'youtube' && <YoutubeIcon />}
                            {post.platform === 'all' && <Share2 size={20} />}
                         </div>
                         <div className="max-w-xl">
                            <p className="text-sm font-medium text-armoyu-text leading-relaxed">"{post.content}"</p>
                            <div className="flex items-center gap-4 mt-3">
                               <div className="flex items-center gap-1.5 text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">
                                  <Clock size={12} /> {post.createdAt}
                               </div>
                               <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${
                                 post.status === 'yayında' ? 'text-emerald-500' : 
                                 post.status === 'planlandı' ? 'text-blue-500' : 'text-amber-500'
                               }`}>
                                  {post.status === 'yayında' && <CheckCircle2 size={12} />}
                                  {post.status} {post.scheduledTime && `(${post.scheduledTime})`}
                               </div>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3 invisible group-hover:visible transition-all">
                         <div className="px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl flex items-center gap-2">
                            <Eye size={14} className="text-blue-500" />
                            <span className="text-[10px] font-black">{post.reach}</span>
                         </div>
                         <button className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-95">
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
