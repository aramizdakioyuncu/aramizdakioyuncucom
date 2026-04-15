'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  PostCard,
  Stories,
  SocialSidebar,
  useAuth,
  useSocket,
  useArmoyu
} from '@armoyu/ui';
import { ArmoyuApi, Post } from '@armoyu/core';
import {
  RefreshCcw,
  Wifi,
  WifiOff,
  Key,
  CheckCircle2,
  Lock,
  MessageSquareX,
  FileX,
  Ban,
  Edit3,
  Search
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export function Dashboard() {
  const { user, session, updateUser, isLoading } = useAuth();
  const { on, emit } = useSocket();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { api } = useArmoyu();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentToken = session?.token || '';

  const fetchFeed = async () => {
    // If we have a real token, we can try to fetch real data
    if (!currentToken) {
      console.log('[Dashboard] No credentials for live feed, waiting...');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const livePosts = await api.social.getPosts(1);
      setPosts(Array.isArray(livePosts) ? livePosts : []);
    } catch (err: any) {
      console.error('[Dashboard] Feed fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [currentToken]);

  // --- UI STATE ---
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(user?.bio || '');

  // Auto-resize logic for textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postContent]);

  const handleCreatePost = async () => {
    if (!postContent.trim() || isPosting || !user) return;

    setIsPosting(true);
    try {
      const newPost = await api.social.createPost(postContent);
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
        setPostContent('');
      } else {
        // Fallback for mock behavior if API returns null but no error
        fetchFeed();
      }
    } catch (err: any) {
      setError("Paylaşım yapılamadı: " + err.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start">

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
              onClick={fetchFeed}
              className="p-2 bg-blue-600/80 hover:bg-blue-600 rounded-xl text-white transition-all shadow-lg shadow-blue-600/10"
            >
              <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
            ⚠️ HATA: {error}
          </div>
        )}

        <Stories />

        {/* PAYLAŞIM ALANI */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border p-5 rounded-[32px] shadow-sm space-y-4">
          <div className="flex gap-4 items-start">
            <img src={user?.avatar} alt="" className="w-12 h-12 rounded-full border border-white/5 shadow-sm bg-black/20" />
            <textarea
              ref={textareaRef}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={user ? "Neler düşünüyorsun?" : "Paylaşım yapmak için giriş yapın..."}
              disabled={!user}
              className="flex-1 bg-transparent border-none text-armoyu-text placeholder-armoyu-text-muted resize-none py-2 focus:ring-0 text-lg font-medium outline-none disabled:opacity-50"
            />
          </div>
          <div className="flex justify-end pt-2 border-t border-white/5">
            <button
              onClick={handleCreatePost}
              disabled={isPosting || !postContent.trim() || !user}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700/50 disabled:text-gray-500 text-white px-8 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
            >
              {isPosting ? 'Gidiyor...' : 'Paylaş'}
            </button>
          </div>
        </div>

        {/* POST AKIŞI */}
        <div className="flex flex-col gap-6">
          {loading && posts.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-4 opacity-50">
              <RefreshCcw size={32} className="animate-spin text-blue-500" />
              <span className="text-xs font-black uppercase tracking-widest">Akış Güncelleniyor...</span>
            </div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} {...post} author={post.author} />
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-40">
              <div className="mb-4 flex justify-center text-armoyu-text-muted">
                <FileX size={48} strokeWidth={1} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest">Henüz bir paylaşım bulunamadı.</p>
              <p className="text-[10px] font-bold text-armoyu-text-muted mt-2">Takip ettiğin kişilerin paylaşımları burada görünür.</p>
            </div>
          )}
        </div>
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
