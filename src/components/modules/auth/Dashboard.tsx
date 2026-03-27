import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PostCard } from './PostCard';
import { Stories } from './Stories';
import { SidebarLeft } from './SidebarLeft';
import { CloudStorageModal } from '../profile/CloudStorageModal';
import Link from 'next/link';
import { userList, postList, groupList } from '@/lib/constants/seedData';
import { Post, Group } from '@/models';

export function Dashboard() {
  const { user } = useAuth();
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{url: string, type: 'image'|'video'}[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Gündemdeki Etiketleri Dinamik Hesapla
  const trendingTags = useMemo(() => {
    const counts: Record<string, number> = {};
    postList.forEach(post => {
      post.hashtags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, []);

  // Filtremele ve Pagination Mantığı
  const allFilteredPosts = selectedTag 
    ? postList.filter(post => post.hashtags?.includes(selectedTag.replace('#', '')))
    : postList;
    
  const visiblePosts = allFilteredPosts.slice(0, visibleCount);

  // Sonsuz Kaydırma Trigger (Intersection Observer)
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && visibleCount < allFilteredPosts.length) {
          setIsLoadingMore(true);
          // Gerçekçi bir "yükleniyor" hissi için kısa bir timeout
          setTimeout(() => {
            setVisibleCount(prev => prev + 10);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, visibleCount, allFilteredPosts.length]);

  return (
    <div className="w-full flex-1 flex gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start">
      
      {/* Sol Yan Panel (Ranking & Economy & MC) */}
      <SidebarLeft />

      
      {/* Ana Akış (Feed) */}
      <div className="flex-1 flex flex-col pt-2">
        
        {/* Hikayeler (Stories) */}
        <Stories />

        {/* Yeni Gönderi Paylaşma Alanı */}
        <div className="glass-panel p-4 md:p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg shadow-sm mb-8">
          <div className="flex gap-4 items-center">
            <img 
              src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 shadow-sm"
            />
            <input 
              type="text" 
              placeholder="Neler yapıyorsun, düşüncelerini paylaş..." 
              className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-2xl px-5 py-3 text-sm text-armoyu-text placeholder-armoyu-text-muted focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
          <div className="flex justify-between items-center mt-3 pl-16">
            <div className="flex gap-2">
                <button 
                  onClick={() => setIsCloudModalOpen(true)} 
                  className="flex items-center justify-center p-2.5 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors shrink-0" 
                  title="Cloud Medya Galerisini Aç"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
                </button>
               <button className="p-2 text-armoyu-text-muted hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></button>
               <button className="p-2 text-armoyu-text-muted hover:text-emerald-500 hover:bg-emerald-500/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-bold rounded-xl shadow-md transition-colors">
              Gönder
            </button>
          </div>
        </div>

        {/* Post Akışı Tablosu */}
        <div className="space-y-6">
          {selectedTag && (
            <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-armoyu-text-muted">Filtrelenen Etiket:</span>
                <span className="text-sm font-black text-blue-500">{selectedTag}</span>
              </div>
              <button 
                onClick={() => { setSelectedTag(null); setVisibleCount(10); }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Filtreyi Temizle
              </button>
            </div>
          )}
          {visiblePosts.length > 0 ? (
            visiblePosts.map(post => (
              <PostCard 
                key={post.id} 
                {...post} 
                onTagClick={(tag: string) => { setSelectedTag(tag); setVisibleCount(10); }}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-armoyu-card-border">
              <p className="text-armoyu-text-muted font-bold">Bu etikete ait henüz bir paylaşım yok.</p>
            </div>
          )}

          {/* Infinity Scroll Loader Area */}
          <div ref={loaderRef} className="py-10 flex flex-col items-center justify-center gap-3">
             {visibleCount < allFilteredPosts.length ? (
               <>
                 <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                 <p className="text-xs font-bold text-armoyu-text-muted animate-pulse italic">Daha fazla içerik yükleniyor...</p>
               </>
             ) : (
               <div className="flex items-center gap-4 opacity-50">
                  <div className="h-px w-20 bg-armoyu-card-border"></div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-armoyu-text-muted">Tüm akış görüntülendi</span>
                  <div className="h-px w-20 bg-armoyu-card-border"></div>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Sağ Yan Panel (Sidebar Widget Area) */}
      <div className="hidden lg:flex w-[320px] flex-col gap-6">
        {/* Kullanıcı Profili Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
           <h3 className="font-extrabold text-armoyu-text mb-2 text-lg">Hoş Geldin, <span className="text-blue-500">{user?.displayName?.split(' ')[0]}</span></h3>
           <p className="text-sm text-armoyu-text-muted font-medium leading-relaxed">Profilini tamamlayarak daha fazla rozet kazanabilir ve toplulukta öne çıkabilirsin.</p>
           <button className="mt-5 w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-armoyu-text text-sm font-bold rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors">Profili Düzenle</button>
        </div>

         {/* Benim Gruplarım Widget (Dynamic) */}
         <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
            <div className="flex items-center justify-between mb-5">
               <h3 className="font-extrabold text-armoyu-text text-lg">Benim Gruplarım</h3>
               <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">{(user?.groups?.length || 0)} Grup</span>
            </div>
            
            <div className="space-y-4">
               {(user?.groups?.length || 0) > 0 ? (
                 user?.groups?.map((group: any, idx: number) => (
                   <Link 
                    key={idx} 
                    href={`/gruplar/${group.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-3 group cursor-pointer p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                      <img src={group.logo} alt={group.name} className="w-10 h-10 rounded-xl object-cover border border-black/5 shadow-sm group-hover:scale-105 transition-transform" />
                      <div className="flex-1 min-w-0">
                         <h4 className="text-sm font-bold text-armoyu-text truncate group-hover:text-blue-500 transition-colors uppercase tracking-tight">{group.name}</h4>
                         <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-armoyu-text-muted truncate opacity-80 uppercase font-bold tracking-widest">{group.shortName} • AKTİF</span>
                         </div>
                      </div>
                   </Link>
                 ))
               ) : (
                 <div className="text-center py-6 px-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-dashed border-armoyu-card-border">
                    <p className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-relaxed">
                       Henüz bir gruba<br/>dahil değilsiniz
                    </p>
                    <Link href="/gruplar" className="inline-block mt-3 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-tighter">Grupları Kesfet →</Link>
                 </div>
               )}
            </div>
         </div>

        {/* Gündemdekiler Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
           <h3 className="font-extrabold text-armoyu-text mb-5 text-lg">Gündemdeki Etiketler</h3>
           <div className="space-y-4">
              {trendingTags.map((tagObj: {name: string, count: number}, idx: number) => (
                <div 
                  key={idx} 
                  className={`flex justify-between items-center cursor-pointer group p-2 rounded-xl transition-all ${selectedTag === tagObj.name ? 'bg-blue-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                  onClick={() => { setSelectedTag(tagObj.name === selectedTag ? null : tagObj.name); setVisibleCount(10); }}
                >
                  <div>
                     <span className={`block text-sm font-bold transition-colors ${selectedTag === tagObj.name ? 'text-blue-500' : 'text-armoyu-text-muted group-hover:text-blue-500'}`}>{tagObj.name}</span>
                     <span className="block text-[11px] text-armoyu-text-muted opacity-70 mt-0.5">{tagObj.count} Gönderi</span>
                  </div>
                  <button className={`text-xs border rounded-full w-7 h-7 flex items-center justify-center transition-colors ${selectedTag === tagObj.name ? 'bg-blue-500 border-blue-500 text-white' : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-transparent text-armoyu-text-muted group-hover:text-armoyu-text'}`}>
                     {selectedTag === tagObj.name ? (
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                     )}
                  </button>
                </div>
              ))}
             
             <button className="w-full mt-2 pt-4 border-t border-armoyu-card-border text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold flex justify-center transition-colors">
               Tümünü Gör
             </button>
           </div>
        </div>


        {/* Popüler Gruplar Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
           <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-armoyu-text text-lg">Popüler Gruplar</h3>
              <Link href="/gruplar" className="text-xs font-bold text-blue-500 hover:underline">Tümü</Link>
           </div>
           
           <div className="space-y-4">
              {groupList.slice(0, 4).map((group, idx) => (
                <Link 
                  key={idx} 
                  href={`/gruplar/${group.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-3 group cursor-pointer p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                   <div className="relative">
                      <img src={group.logo} alt={group.name} className="w-10 h-10 rounded-xl object-cover border border-black/5 shadow-sm" />
                      {group.recruitment === 'Açık' && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-armoyu-card-bg shadow-sm" title="Alımlar Açık" />
                      )}
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-armoyu-text truncate group-hover:text-blue-500 transition-colors uppercase tracking-tight">{group.name}</h4>
                      <p className="text-[10px] text-armoyu-text-muted truncate opacity-80">{group.category} • {group.recruitment === 'Açık' ? 'Katıl' : 'Kapalı'}</p>
                   </div>
                </Link>
              ))}
              
              <button className="w-full py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-armoyu-text text-xs font-bold rounded-xl transition-all active:scale-[0.98]">
                 Yeni Grup Oluştur
              </button>
           </div>
        </div>

      </div>
      
      {/* Cloud Manager Global Linker */}
      <CloudStorageModal 
        isOpen={isCloudModalOpen} 
        onClose={() => setIsCloudModalOpen(false)}
        onSelectMedia={(url, type) => {
          setSelectedMedia(prev => [...prev, {url, type}]);
          setIsCloudModalOpen(false);
        }}
      />
    </div>
  );
}
