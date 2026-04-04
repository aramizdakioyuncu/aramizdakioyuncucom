'use client';

import React, { useState } from 'react';
import { 
  FilePlus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar, 
  User as UserIcon,
  CheckCircle,
  Clock,
  Pin,
  MoreVertical,
  ExternalLink,
  Tag,
  X,
  Play
} from 'lucide-react';
import { newsList } from '@/lib/constants/seedData';
import Link from 'next/link';

export default function NewsManagementPage() {
  const [localNews, setLocalNews] = useState(newsList.map(n => ({ ...n, status: 'Published' })));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'review'>('all');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter Logic
  const filteredNews = localNews.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         n.author?.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'published' && n.status === 'Published') ||
                      (activeTab === 'review' && n.status === 'Review');
    return matchesSearch && matchesTab;
  });

  const handlePublish = (slug: string) => {
    setLocalNews(prev => prev.map(n => n.slug === slug ? { ...n, status: 'Published' } : n));
  };

  const handleDelete = (slug: string) => {
    setLocalNews(prev => prev.filter(n => n.slug !== slug));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      
      {/* Preview Modal */}
      {isPreviewOpen && selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsPreviewOpen(false)} />
           <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-5xl h-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-armoyu-card-border flex items-center justify-between bg-black/20">
                 <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-600 text-[10px] font-black rounded-lg text-white uppercase italic tracking-widest">ÖNİZLEME MODU</span>
                    <h3 className="text-sm font-black text-armoyu-text uppercase truncate">{selectedNews.title}</h3>
                 </div>
                 <button onClick={() => setIsPreviewOpen(false)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-white/5 rounded-xl transition-all">
                    <X size={20} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                 <img src={selectedNews.image} className="w-full h-80 object-cover rounded-[32px] shadow-2xl" alt="" />
                 <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <img src={selectedNews.author?.avatar} className="w-8 h-8 rounded-full" alt="" />
                          <span className="text-sm font-black text-armoyu-text italic">{selectedNews.author?.displayName}</span>
                       </div>
                       <span className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest">{selectedNews.date}</span>
                       <span className="text-xs font-black text-blue-500 uppercase tracking-widest italic">{selectedNews.category}</span>
                    </div>
                    <h1 className="text-4xl font-black text-armoyu-text uppercase italic leading-tight tracking-tighter">{selectedNews.title}</h1>
                    <div className="prose prose-invert max-w-none">
                       <p className="text-lg text-armoyu-text-muted leading-relaxed font-medium">Bu bir önizleme metnidir. Okuyucular haberi bu şekilde görüntüleyecektir. İçerik ve görsellerin doğruluğundan emin olduktan sonra yayına alabilirsiniz.</p>
                       <p className="text-armoyu-text-muted/60 text-sm italic mt-4 border-l-4 border-blue-500/30 pl-4 uppercase font-black tracking-widest">NOT: Haber yayına alındıktan sonra tüm kullanıcılar tarafından görülebilecektir.</p>
                    </div>
                 </div>
              </div>
              <div className="p-8 border-t border-armoyu-card-border bg-black/20 flex gap-4">
                 <button onClick={() => setIsPreviewOpen(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-armoyu-text font-black rounded-2xl text-xs uppercase tracking-widest transition-all">Kapat</button>
                 {selectedNews.status !== 'Published' && (
                   <button 
                     onClick={() => { handlePublish(selectedNews.slug); setIsPreviewOpen(false); }}
                     className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all font-bold italic"
                   >
                     YAYINA AL
                   </button>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-armoyu-text uppercase italic leading-none">Haber <span className="text-blue-500">Yönetimi</span></h1>
           <p className="text-armoyu-text-muted font-medium text-sm mt-1">Platformdaki tüm haberleri, duyuruları ve blog yazılarını buradan yönet.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap uppercase tracking-widest text-xs">
           <FilePlus size={18} /> Yeni Haber Ekle
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {[
           { id: 'all', label: 'TÜMÜ' },
           { id: 'published', label: 'YAYINDA' },
           { id: 'review', label: 'ONAY BEKLEYEN' }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
               activeTab === tab.id 
                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab.label}
           </button>
         ))}
      </div>

      {/* Filter & Search */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[28px] p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
           <input 
              type="text" 
              placeholder="Başlık veya yazar ile ara..." 
              className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
        <button className="p-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl text-armoyu-text-muted hover:text-armoyu-text transition-all italic font-bold">
           <Filter size={20} />
        </button>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredNews.map((news) => (
          <div key={news.slug} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-4 md:p-6 hover:border-blue-500/20 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            {/* Image Preview */}
            <div className="w-full md:w-48 h-32 md:h-28 rounded-2xl overflow-hidden shrink-0 relative">
               <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
               <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-1 italic">
                  <Tag size={10} /> {news.category}
               </div>
            </div>

            {/* Content Info */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1.5">
                  <span className={`p-1 px-2 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1 italic ${
                    news.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                     {news.status === 'Published' ? <CheckCircle size={10} /> : <Clock size={10} />}
                     {news.status === 'Published' ? 'Yayında' : 'İnceleniyor'}
                  </span>
                  <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center gap-1 leading-none">
                     <Calendar size={10} /> {news.date}
                  </span>
               </div>
               <h3 className="text-lg font-black text-armoyu-text leading-tight mb-2 group-hover:text-blue-500 transition-colors truncate uppercase italic">{news.title}</h3>
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                     <img src={news.author?.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                     <span className="text-[11px] font-bold text-armoyu-text-muted italic">{news.author?.displayName}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-armoyu-card-border" />
                  <div className="text-[11px] font-bold text-armoyu-text-muted flex items-center gap-1 uppercase tracking-tighter">
                     <Eye size={12} /> 1.2K Okunma
                  </div>
               </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-armoyu-card-border pt-4 md:pt-0">
               {news.status !== 'Published' && (
                 <button 
                   onClick={() => handlePublish(news.slug)}
                   title="Yayına Al" className="p-3 text-emerald-500 hover:bg-emerald-500/10 rounded-2xl transition-all border border-transparent hover:border-emerald-500/20"
                 >
                    <Play size={20} fill="currentColor" />
                 </button>
               )}
               <button 
                 onClick={() => { setSelectedNews(news); setIsPreviewOpen(true); }}
                 title="Haberi Önizle" className="p-3 text-armoyu-text-muted hover:text-blue-500 hover:bg-blue-500/10 rounded-2xl transition-all border border-transparent hover:border-blue-500/20"
               >
                  <Eye size={20} />
               </button>
               <button title="Haberi Düzenle" className="p-3 text-armoyu-text-muted hover:text-amber-500 hover:bg-amber-500/10 rounded-2xl transition-all border border-transparent hover:border-amber-500/20">
                  <Edit3 size={20} />
               </button>
               <div className="w-px h-8 bg-armoyu-card-border mx-2 hidden md:block" />
               <button 
                 onClick={() => handleDelete(news.slug)}
                 title="Haberi Sil" className="p-3 text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
               >
                  <Trash2 size={20} />
               </button>
               <button className="md:hidden p-3 text-armoyu-text-muted hover:text-armoyu-text bg-black/5 dark:bg-white/10 rounded-2xl transition-all">
                  <MoreVertical size={20} />
               </button>
            </div>

         </div>
        ))}

        {filteredNews.length === 0 && (
           <div className="py-20 text-center bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] border-dashed">
              <Search size={48} className="mx-auto text-armoyu-text-muted opacity-20 mb-4" />
              <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic font-bold">Aradığın haber bulunamadı.</p>
           </div>
        )}
      </div>

    </div>
  );
}
