'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  PostCard, 
  Stories, 
  AuthSidebarLeft, 
  useAuth, 
  useSocket 
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
  const { user, updateUser } = useAuth();
  const { on, emit } = useSocket();
  const searchParams = useSearchParams();
  const router = useRouter();

  // --- API & LIVE DATA STATE ---
  const [useLive, setUseLive] = useState(true);
  const [apiKey, setApiKey] = useState('0'); // Default to 0 or read from storage
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = useMemo(() => {
    return new ArmoyuApi({
      apiKey: apiKey,
      token: token || null,
      baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/api/proxy` : '/api/proxy'
    });
  }, [apiKey, token]);

  const fetchFeed = async () => {
    if (!apiKey || apiKey === '0') return;
    
    setLoading(true);
    setError(null);
    try {
      const livePosts = await api.social.getFeed(1);
      setPosts(livePosts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [apiKey, token]);

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
    if (!postContent.trim() || isPosting || !user || apiKey === '0') return;

    setIsPosting(true);
    try {
      const newPost = await api.social.createPost(postContent);
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
        setPostContent('');
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
        <AuthSidebarLeft />
      </aside>

      {/* Ana Akış */}
      <div className="flex-1 w-full max-w-2xl mx-auto space-y-6">
        
        {/* API CONFIG PANEL (Şimdilik Geliştirme İçin) */}
        <div className="bg-black/10 dark:bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-4">
           <div className="flex items-center gap-3 shrink-0">
              <div className={`p-2 rounded-xl ${useLive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'}`}>
                 {useLive ? <Wifi size={18} /> : <WifiOff size={18} />}
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-armoyu-text">Canlı Bağlantı</h4>
                 <p className="text-[9px] font-bold text-armoyu-text-muted uppercase">ARMOYU CORE ETKİN</p>
              </div>
           </div>

           <div className="flex-1 flex gap-2 w-full">
              <input 
                 type="password"
                 placeholder="API Key..."
                 value={apiKey}
                 onChange={(e) => setApiKey(e.target.value)}
                 className="flex-1 bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-mono text-armoyu-text outline-none focus:border-blue-500 transition-all font-bold"
              />
              <button 
                onClick={fetchFeed}
                className="p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-colors"
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
              <img src={user?.avatar} alt="" className="w-12 h-12 rounded-full border border-white/5 shadow-sm" />
              <textarea
                ref={textareaRef}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Neler düşünüyorsun?"
                className="flex-1 bg-transparent border-none text-armoyu-text placeholder-armoyu-text-muted resize-none py-2 focus:ring-0 text-lg font-medium outline-none"
              />
           </div>
           <div className="flex justify-end pt-2 border-t border-white/5">
              <button 
                onClick={handleCreatePost}
                disabled={isPosting || !postContent.trim() || apiKey === '0'}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white px-8 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
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
                <span className="text-xs font-black uppercase tracking-widest">Veriler Çekiliyor...</span>
             </div>
           ) : posts.length > 0 ? (
             posts.map(post => (
               <PostCard key={post.id} {...post} author={post.author} />
             ))
           ) : (
             <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-40">
                <p className="text-xs font-black uppercase tracking-widest">Henüz bir paylaşım bulunamadı.</p>
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
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-armoyu-text">HOŞ GELDİN, <span className="text-blue-500">{user?.displayName?.split(' ')[0]}</span></h3>
               <p className="text-xs font-bold text-armoyu-text-muted leading-relaxed uppercase italic">ARMOYU Dünyasına yeniden hoş geldin. Bugün neler başarmak istersin?</p>
               
               <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Sistem Statüsü: Çevrimiçi</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Kütüphane: @armoyu/core v1.0.1</span>
                  </div>
               </div>
            </div>
         </div>
      </aside>

    </div>
  );
}
