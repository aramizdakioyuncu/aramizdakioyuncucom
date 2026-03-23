'use client';

import React from 'react';
import { PageWidth } from '@/components/shared/PageWidth';

const MODS = [
  { id: '1', name: 'ARMOYU Realistic Minecraft Pack', game: 'Minecraft', version: '1.20.1', author: 'Berkay T.', downloads: '1.2k', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80', isFeatured: true },
  { id: '2', name: 'Tofaş Doğan SLX Drift Mod', game: 'Assetto Corsa', version: 'v2.4', author: 'Barış M.', downloads: '4.5k', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80' },
  { id: '3', name: 'Medieval Kingdom Pack', game: 'Minecraft', version: '1.19.2', author: 'Bey Ev', downloads: '850', image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80' },
  { id: '4', name: 'Nürburgring Night Edition', game: 'Assetto Corsa', version: '1.0', author: 'Orkun A.', downloads: '2.1k', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80' },
  { id: '5', name: 'ARMOYU Voice Chat Integration', game: 'Minecraft', version: 'v1.5', author: 'Yılmaz A.', downloads: '3.2k', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80' },
  { id: '6', name: 'Ultra Shader Pack V2', game: 'Genel', version: 'v5.0', author: 'Ersan G.', downloads: '12k', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' }
];

export default function ModsPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic">OYUN MODLARI</h1>
        <p className="text-armoyu-text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
          ARMOYU ekibi ve topluluk tarafından geliştirilen en iyi oyun modlarını keşfet ve hemen indir.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         
         {/* Filter Sidebar */}
         <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">KATEGORİLER</h4>
               <div className="space-y-2">
                  {['Hepsi', 'Minecraft', 'Assetto Corsa', 'Counter-Strike', 'Diğer'].map((cat) => (
                    <button key={cat} className={`w-full text-left px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${cat === 'Hepsi' ? 'bg-blue-600 text-white' : 'text-armoyu-text-muted hover:bg-black/5 dark:hover:bg-white/5'}`}>
                       {cat}
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h3 className="text-xs font-black text-blue-500 mb-4 uppercase tracking-widest">ARMOYU ÖNERİSİ</h3>
               <p className="text-[10px] font-bold text-armoyu-text-muted leading-relaxed italic">
                 "Realistic Minecraft Pack" modumuz %20 daha fazla performans sağlaması için optimize edilmiştir.
               </p>
            </div>
         </div>

         {/* Mods Grid */}
         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
            {MODS.map((mod) => (
              <div key={mod.id} className="group glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden hover:shadow-2xl transition-all duration-500 bg-armoyu-card-bg flex flex-col">
                 <div className="relative h-48 overflow-hidden shrink-0">
                    <img src={mod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={mod.name} />
                    <div className="absolute top-4 left-4">
                       <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10">
                          {mod.game}
                       </span>
                    </div>
                    {mod.isFeatured && (
                       <div className="absolute top-4 right-4 animate-pulse">
                          <span className="px-3 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30">
                             GÜNCEL
                          </span>
                       </div>
                    )}
                 </div>
                 
                 <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                       <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors line-clamp-2 leading-tight">
                          {mod.name}
                       </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-8 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">
                       <div className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                          {mod.downloads}
                       </div>
                       <div className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          {mod.version}
                       </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500">
                             {mod.author.charAt(0)}
                          </div>
                          <span className="text-[10px] font-black text-armoyu-text uppercase opacity-60">
                             {mod.author}
                          </span>
                       </div>
                       <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                          İNDİRMEYE GİT
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>

      </div>
    </div>
  );
}
