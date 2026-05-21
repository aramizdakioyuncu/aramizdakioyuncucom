'use client';

import React, { useState } from 'react';
import { 
  PageWidth, 
  MediaLightbox, 
  GalleryHeaderWidget, 
  GalleryFilterBar, 
  GalleryMasonryGrid,
  PostMedia 
} from '@armoyu/ui';

// Dummy data is moved to page layout or handled externally (simulated here since we only migrated structure)
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
      
      {/* Structural Layout */}
      <GalleryHeaderWidget />
      
      <GalleryFilterBar 
         categories={categories} 
         activeTab={activeTab} 
         setActiveTab={setActiveTab} 
      />

      <GalleryMasonryGrid 
         images={filteredImages} 
         setLightboxIndex={setLightboxIndex} 
      />

      {/* Lightbox Integration */}
      {lightboxIndex !== null && (
        <MediaLightbox 
          isOpen={lightboxIndex !== null} 
          onClose={() => setLightboxIndex(null)} 
          media={filteredImages.map(img => ({ type: img.type as any, url: img.url }))} 
          initialIndex={lightboxIndex} 
        />
      )}

      {/* Pagination Container Component or Code */}
      <div className="mt-16 flex justify-center">
         <button className="px-10 py-4 border border-armoyu-card-border hover:border-blue-500 hover:text-blue-500 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 hover:bg-blue-500/5 shadow-xl shadow-transparent hover:shadow-blue-500/5">
            DAHA FAZLA GÖRÜNTÜ YÜKLE
         </button>
      </div>
    </div>
  );
}
