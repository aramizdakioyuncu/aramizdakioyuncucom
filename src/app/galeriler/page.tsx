'use client';

import React, { useState } from 'react';
import { GalleryCard } from '@/components/modules/galleries/GalleryCard';
import { PageWidth } from '@/components/shared/PageWidth';

const MOCK_GALLERIES = [
  {
    title: 'Night Drive in Alps',
    count: 12,
    author: 'berkaytikeno',
    date: '3 saat önce',
    category: 'ETS2',
    image: 'https://images.unsplash.com/photo-1590333748338-d43cae6a3286?q=80&w=2674&auto=format&fit=crop'
  },
  {
    title: 'PGL Major Highlights 2024',
    count: 24,
    author: 'alperen_admin',
    date: '1 gün önce',
    category: 'Counter-Strike',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Nürburgring Lap Times',
    count: 10,
    author: 'emirhan_top',
    date: '12 saat önce',
    category: 'Assetto Corsa',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2664&auto=format&fit=crop'
  },
  {
    title: 'Champions League Final 2024',
    count: 32,
    author: 'zeynocash',
    date: '2 gün önce',
    category: 'Futbol',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Heavy Cargo Convoy',
    count: 8,
    author: 'kaan_arslan',
    date: '4 saat önce',
    category: 'ETS2',
    image: 'https://images.unsplash.com/photo-1586191582056-9199042ea570?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Sunset Drifting',
    count: 15,
    author: 'selingunay',
    date: '6 saat önce',
    category: 'Assetto Corsa',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Vintage Skin Collection',
    count: 45,
    author: 'melis_dev',
    date: '1 hafta önce',
    category: 'Counter-Strike',
    image: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Street Football Series',
    count: 18,
    author: 'can_demir',
    date: '2 gün önce',
    category: 'Futbol',
    image: 'https://images.unsplash.com/photo-1529900664417-10134f7f5255?q=80&w=2670&auto=format&fit=crop'
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('Hepsi');
  
  const categories = ['Hepsi', 'ETS2', 'Counter-Strike', 'Assetto Corsa', 'Futbol'];
  
  const filteredGalleries = activeTab === 'Hepsi' 
    ? MOCK_GALLERIES 
    : MOCK_GALLERIES.filter(g => g.category === activeTab);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter">GALERİLER</h1>
          <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
            Topluluğumuz tarafından paylaşılan en iyi ekran görüntüleri ve anları burada keşfet.
          </p>
        </div>
        
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all w-fit mx-auto lg:mx-0">
           Fotoğraf Yükle
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveTab(cat)}
               className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === cat ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
             >
               {cat}
             </button>
           ))}
        </div>
        
        <div className="relative w-full md:w-80">
           <input 
             type="text" 
             placeholder="Galeri ara..." 
             className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-3 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" 
           />
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute right-4 top-3 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredGalleries.map((gallery, idx) => (
          <GalleryCard key={idx} {...gallery} />
        ))}
      </div>

      {/* Pagination (Daha fazla yükle simülasyonu) */}
      <div className="mt-16 flex justify-center">
         <button className="px-10 py-3.5 border border-armoyu-card-border hover:border-blue-500 hover:text-blue-500 text-armoyu-text font-black text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-95 hover:bg-blue-500/5">
            Daha Fazla Göster
         </button>
      </div>
    </div>
  );
}
