'use client';

import React, { useState } from 'react';
import { NewsCard } from '@/components/modules/news/NewsCard';
import { PageWidth } from '@/components/shared/PageWidth';

const MOCK_NEWS = [
  {
    slug: 'armoyu-v3-guncellemesi',
    title: 'ARMOYU V3 Güncellemesi Yayında: Yeni Arayüz ve Özellikler!',
    excerpt: 'Topluluğumuzun yeni yüzü olan V3 sürümüyle birlikte artık çok daha hızlı, modern ve interaktif bir deneyim sizi bekliyor.',
    date: '2 saat önce',
    category: 'Güncelleme',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
    author: 'berkaytikeno'
  },
  {
    slug: 'valorant-clove-analiz',
    title: "Valorant Yeni Ajan 'Clove' Yetenek Analizi: Stratejiler Nasıl Değişecek?",
    excerpt: 'Ölümden sonra bile takımına destek olabilen yeni ajan Clove, rekabetçi arenalarda dengeleri alt üst etmeye hazırlanıyor.',
    date: '5 saat önce',
    category: 'Oyun Haberleri',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
    author: 'alperen_admin'
  },
  {
    slug: 'cs-turnuva-sonuclari',
    title: 'Haftalık ARMOYU CS Turnuvası Şampiyonu: RIHTIM Team!',
    excerpt: 'Nefes kesen final mücadelesinde RIHTIM Team, rakibini 16-14 yenerek bu haftanın şampiyonluk kupasını kaldırmayı başardı.',
    date: '1 gün önce',
    category: 'E-spor',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop',
    author: 'kaan_arslan'
  },
  {
    slug: 'ets2-1-50-grafik-yeniligi',
    title: 'ETS2 1.50 Güncellemesi Detayları: Yeni Grafik Motoru ve Işıklandırma',
    excerpt: 'SCS Software, beklenen 1.50 güncellemesiyle tır sürme deneyimini gerçekçilikte bir üst seviyeye taşıyor. İşte tüm detaylar.',
    date: '2 gün önce',
    category: 'Güncelleme',
    image: 'https://images.unsplash.com/photo-1590333748338-d43cae6a3286?q=80&w=2674&auto=format&fit=crop',
    author: 'can_demir'
  },
  {
    slug: 'minecraft-survival-sezon-acildi',
    title: 'Yepyeni Bir Macera: Minecraft Survival 5. Sezon Başlıyor!',
    excerpt: 'Keşfedilmemiş topraklar, yeni klan bölgeleri ve özel görevlerle dolu Survival sunucumuzun yeni sezonuna hazır mısınız?',
    date: '3 gün önce',
    category: 'Etkinlikler',
    image: 'https://images.unsplash.com/photo-1587573089734-09cb6960951b?q=80&w=2672&auto=format&fit=crop',
    author: 'zeynocash'
  }
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('Hepsi');
  
  const categories = ['Hepsi', 'Oyun Haberleri', 'Güncelleme', 'E-spor', 'Etkinlikler'];
  
  const filteredNews = activeTab === 'Hepsi' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.category === activeTab);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter uppercase">ARMOYU HABERLER</h1>
        <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
          Oyun dünyasındaki gelişmeler, sunucu güncellemeleri ve topluluk haberleri anlık olarak burada.
        </p>
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
             placeholder="Haber ara..." 
             className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-3 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" 
           />
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute right-4 top-3 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredNews.map((news, idx) => (
          <NewsCard key={idx} {...news} />
        ))}
      </div>

      {/* Newsletter / Abone Ol (Premium look) */}
      <div className="mt-20 glass-panel p-10 md:p-16 rounded-[40px] border border-armoyu-card-border bg-gradient-to-br from-blue-600/10 to-indigo-600/5 flex flex-col items-center text-center">
         <h2 className="text-3xl md:text-4xl font-black text-armoyu-text mb-4">Gelişmelerden Haberdar Ol</h2>
         <p className="text-armoyu-text-muted text-lg max-w-xl mb-10">Bültenimize kaydol ve en güncel haberleri ilk sen öğren. Haftalık özetler kapına gelsin.</p>
         <div className="flex flex-col md:flex-row gap-3 w-full max-w-lg">
            <input 
              type="email" 
              placeholder="E-posta adresin" 
              className="flex-1 bg-white dark:bg-zinc-900 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm text-armoyu-text focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95">
               Kaydol
            </button>
         </div>
         <p className="text-[10px] text-armoyu-text-muted mt-6 opacity-60">Kaydolarak gizlilik politikamızı ve kullanım koşullarımızı kabul etmiş olursun.</p>
      </div>
    </div>
  );
}
