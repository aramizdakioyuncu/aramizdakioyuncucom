'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  PostCard,
  Stories,
  SocialSidebar,
  useAuth,
  useSocket,
  useArmoyu,
  SocialFeed,
  PostComposer,
  CloudModal,
  type SocialFeedRef
} from '@armoyu/ui';
import { ArmoyuApi, Post } from '@armoyu/core';
import {
  RefreshCcw,
  Wifi,
  WifiOff,
  Key,
  CheckCircle2,
  Lock,
  Search
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export function Dashboard() {
  const { user, session, isLoading } = useAuth();
  const { api } = useArmoyu();
  const [isPosting, setIsPosting] = useState(false);
  const [isCloudOpen, setIsCloudOpen] = useState(false);
  const [attachments, setAttachments] = useState<{ url: string; type: 'image' | 'video' | 'audio' }[]>([]);
  const feedRef = useRef<SocialFeedRef>(null);

  const currentToken = session?.token || '';

  const handleCreatePost = async (content: string, mediaUrls?: string[]) => {
    setIsPosting(true);
    try {
      const result = await api.social.createPost(content, []);
      if (result.durum === 1) {
        setAttachments([]);
        feedRef.current?.refresh();
      } else {
        alert(result.aciklama || "Paylaşım başarısız oldu.");
      }
    } catch (err: any) {
      console.error("Paylaşım yapılamadı:", err);
      alert("Bir bağlantı hatası oluştu.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start">
      <CloudModal 
        isOpen={isCloudOpen} 
        onClose={() => setIsCloudOpen(false)} 
        onSelectMedia={(media) => {
          setAttachments(prev => [...prev, media]);
          setIsCloudOpen(false);
        }}
      />

      {/* Sol Yan Panel */}
      <aside className="hidden lg:block w-72 h-fit sticky top-24">
        <SocialSidebar />
      </aside>

      {/* Ana Akış */}
      <div className="flex-1 w-full max-w-2xl mx-auto space-y-6">

        {/* API CONFIG PANEL - Discreet for Prod/Staging */}
        <div className="bg-black/10 dark:bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className={`p-2 rounded-xl ${currentToken ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
              {currentToken ? <Wifi size={18} /> : <WifiOff size={18} />}
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-armoyu-text">
                {isLoading ? 'Bağlanıyor...' : (currentToken ? 'Canlı Bağlantı' : 'Sınırlı Erişim')}
              </h4>
              <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-tighter">
                {isLoading ? 'Kontrol Ediliyor' : (currentToken ? 'Oturum Aktif' : 'Giriş Gerekli')}
              </p>
            </div>
          </div>

          <div className="flex-1 flex gap-2 w-full">
            <div className="flex-1 bg-black/20 border border-white/5 rounded-xl px-4 py-2 flex items-center gap-2">
              <Lock size={12} className="text-armoyu-text-muted" />
              <span className="text-[9px] font-mono text-armoyu-text-muted truncate max-w-[150px]">
                {currentToken ? `TOKEN: ${currentToken.substring(0, 10)}...` : 'Giriş yaparak tüm özellikleri açın.'}
              </span>
            </div>
            <button
              onClick={() => feedRef.current?.refresh()}
              className="p-2 bg-blue-600/80 hover:bg-blue-600 rounded-xl text-white transition-all shadow-lg shadow-blue-600/10"
            >
              <RefreshCcw size={14} />
            </button>
          </div>
        </div>

        <Stories />

        <PostComposer 
          user={user} 
          onPost={handleCreatePost}
          isPosting={isPosting}
          onOpenCloudGallery={() => setIsCloudOpen(true)}
          attachments={attachments}
          onRemoveAttachment={(index) => setAttachments(prev => prev.filter((_, i) => i !== index))}
        />

        {/* POST AKIŞI */}
        <SocialFeed 
          ref={feedRef}
          emptyMessage="Henüz bir paylaşım bulunamadı. Takip ettiğin kişilerin paylaşımları burada görünür."
        />
      </div>

      {/* Sağ Yan Panel */}
      <aside className="hidden xl:flex w-80 flex-col gap-6 sticky top-24">
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] p-8 space-y-6 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <CheckCircle2 size={120} />
          </div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-armoyu-text">
              {user ? 'HOŞ GELDİN,' : 'MİSAFİR,'} <br />
              <span className="text-blue-500">{user?.displayName?.split(' ')[0] || 'OYUNCU'}</span>
            </h3>
            <p className="text-xs font-bold text-armoyu-text-muted leading-relaxed uppercase italic">
              {user ? 'ARMOYU Dünyasına yeniden hoş geldin. Bugün neler başarmak istersin?' : 'Topluluğa katılmak ve tüm özellikleri kullanmak için giriş yapın.'}
            </p>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${user ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
                  Sistem Statüsü: {user ? 'Çevrimiçi' : 'Misafir'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Kütüphane: @armoyu/v3 v1.0.2</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
}
