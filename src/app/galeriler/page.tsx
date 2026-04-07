'use client';

import React, { useState } from 'react';
import { PageWidth } from '@armoyu/ui';
import { MediaLightbox, PostMedia } from '@armoyu/ui';

const MOCK_GALLERY_IMAGES: (PostMedia & { id: string; title: string; author: string; category: string })[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1590333748338-d43cae6a3286?q=80&w=2674&auto=format&fit=crop', title: 'Night Drive in Alps', author: 'berkaytikeno', category: 'ETS2' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', title: 'PGL Major Highlights 2024', author: 'alperen_admin', category: 'Counter-Strike' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2664&auto=format&fit=crop', title: 'Nürburgring Lap Times', author: 'emirhan_top', category: 'Assetto Corsa' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2670&auto=format&fit=crop', title: 'Champions League Final 2024', author: 'zeynocash', category: 'Futbol' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1586191582056-9199042ea570?q=80&w=2670&auto=format&fit=crop', title: 'Heavy Cargo Convoy', author: 'kaan_arslan', category: 'ETS2' },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop', title: 'Sunset Drifting', author: 'selingunay', category: 'Assetto Corsa' },
  { id: '7', type: 'image', url: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=2670&auto=format&fit=crop', title: 'Vintage Skin Collection', author: 'melis_dev', category: 'Counter-Strike' },
  { id: '8', type: 'image', url: 'https://images.unsplash.com/photo-1529900664417-10134f7f5255?q=80&w=2670&auto=format&fit=crop', title: 'Street Football Series', author: 'can_demir', category: 'Futbol' },
  { id: '9', type: 'image', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671', title: 'Gaming Setup', author: 'berkaytikeno', category: 'Setup' },
  { id: '10', type: 'image', url: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2670', title: 'Esports Arena', author: 'alperen_admin', category: 'Events' },
  { id: '11', type: 'image', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670', title: 'Neon Controller', author: 'emirhan_top', category: 'Oyunlar' },
  { id: '12', type: 'image', url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2671', title: 'VR Life', author: 'zeynocash', category: 'Teknoloji' }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const categories = ['Hepsi', 'ETS2', 'Counter-Strike', 'Assetto Corsa', 'Futbol', 'Setup', 'Events'];
  
  const filteredImages = activeTab === 'Hepsi' 
    ? MOCK_GALLERY_IMAGES 
    : MOCK_GALLERY_IMAGES.filter(img => img.category === activeTab);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter italic uppercase">GALERİ</h1>
          <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
            Topluluğumuz tarafından paylaşılan en iyi ekran görüntüleri ve anları burada keşfet.
          </p>
        </div>
        
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all w-fit mx-auto lg:mx-0">
           Fotoğraf Yükle
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-[22px] border border-armoyu-card-border overflow-x-auto no-scrollbar max-w-full">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveTab(cat)}
               className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === cat ? 'bg-blue-600 text-white shadow-xl' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
             >
               {cat}
             </button>
           ))}
        </div>
        
        <div className="relative w-full md:w-80">
           <input 
             type="text" 
             placeholder="Galeri ara..." 
             className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl px-6 py-3.5 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-bold placeholder:text-armoyu-text-muted/40" 
           />
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="absolute right-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Galleries Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredImages.map((img, idx) => (
          <div 
            key={img.id} 
            className="break-inside-avoid relative glass-panel rounded-3xl overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            onClick={() => setLightboxIndex(idx)}
          >
            <img 
               src={img.url} 
               alt={img.title} 
               className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 backdrop-blur-md">
                    {img.category}
                  </span>
               </div>
               <h3 className="text-white font-black text-sm uppercase tracking-tight mb-1">{img.title}</h3>
               <p className="text-white/60 text-[11px] font-bold">@{img.author}</p>
            </div>
            
            {/* View Icon Overlay */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Integration */}
      {lightboxIndex !== null && (
        <MediaLightbox 
          isOpen={lightboxIndex !== null} 
          onClose={() => setLightboxIndex(null)} 
          media={filteredImages.map(img => ({ type: img.type, url: img.url }))} 
          initialIndex={lightboxIndex} 
        />
      )}

      {/* Pagination */}
      <div className="mt-16 flex justify-center">
         <button className="px-10 py-4 border border-armoyu-card-border hover:border-blue-500 hover:text-blue-500 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 hover:bg-blue-500/5 shadow-xl shadow-transparent hover:shadow-blue-500/5">
            DAHA FAZLA GÖRÜNTÜ YÜKLE
         </button>
      </div>
    </div>
  );
}
