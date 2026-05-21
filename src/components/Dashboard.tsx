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
  TrendingWidget,
  NewMembersWidget,
  PageWidth,
  type SocialFeedRef
} from '@armoyu/ui';
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
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start justify-center">
      <PageWidth width="max-w-[1280px]" />
      <CloudModal
        isOpen={isCloudOpen}
        onClose={() => setIsCloudOpen(false)}
        onSelectMedia={(media) => {
          setAttachments(prev => [...prev, media]);
          setIsCloudOpen(false);
        }}
      />
      
      {/* Sol Yan Panel */}
      <aside className="hidden lg:block w-72 h-fit sticky top-24 shrink-0">
        <SocialSidebar />
      </aside>

      {/* Ana Akış */}
      <div className="flex-1 w-full min-w-0 space-y-6">
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
      <aside className="hidden xl:flex w-80 flex-col gap-6 sticky top-24 shrink-0">
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
                <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Kütüphane: @armoyu/ui v{require('@armoyu/ui/package.json').version}</span>
              </div>
            </div>
          </div>
        </div>

        <TrendingWidget />
        <NewMembersWidget />
      </aside>

    </div>
  );
}
