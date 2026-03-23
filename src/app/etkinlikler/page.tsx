'use client';

import React from 'react';
import { PageWidth } from '@/components/shared/PageWidth';

const EVENTS = [
  { id: '1', name: 'Valorant Kış Turnuvası', game: 'Valorant', date: '25 Mart 2024', status: 'KAYIT AÇIK', rewards: '5000 TL + VP', participants: '32/64', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', isHot: true },
  { id: '2', name: 'Assetto Corsa Drift Gecesi', game: 'Assetto Corsa', date: '20 Mart 2024', status: 'DEVAM EDİYOR', rewards: 'Discord VIP Rolü', participants: '12/20', image: 'https://images.unsplash.com/photo-1547915720-336fe09624b4?w=800&q=80', isLive: true },
  { id: '3', name: 'Minecraft Build Yarışması', game: 'Minecraft', date: '1 Nisan 2024', status: 'BAŞLIYOR', rewards: '1000 TL Steam Cüzdan', participants: '15/50', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80' },
  { id: '4', name: 'CS2 Topluluk Maçı #12', game: 'CS2', date: '18 Mart 2024', status: 'BİTTİ', rewards: 'Skin Hediyesi', participants: '10/10', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' }
];

export default function EventsPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <div className="mb-24 text-center">
        <h1 className="text-4xl md:text-7xl font-black text-armoyu-text mb-8 uppercase tracking-tighter italic leading-tight">ETKİNLİKLER & TURNUVALAR</h1>
        <p className="text-armoyu-text-muted text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
          ARMOYU topluluğunda rekabet asla bitmez. Ödüllü turnuvalara katıl, yeteneğini göster ve zirveye adını yazdır.
        </p>
      </div>

      <div className="space-y-16">
         
         {/* Filter Tabs */}
         <div className="flex flex-wrap justify-center gap-4">
            {['Aktif Etkinlikler', 'Yaklaşanlar', 'Biten Turnuvalar', 'Özel Etkinlikler'].map((tab, idx) => (
              <button key={tab} className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${idx === 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-blue-500 border border-armoyu-card-border'}`}>
                 {tab}
              </button>
            ))}
         </div>

         {/* Events Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {EVENTS.map((event) => (
              <div key={event.id} className="group flex flex-col xl:flex-row glass-panel rounded-[50px] border border-armoyu-card-border overflow-hidden hover:shadow-2xl transition-all duration-500 bg-armoyu-card-bg group">
                 <div className="w-full xl:w-72 h-64 xl:h-auto overflow-hidden shrink-0 relative">
                    <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.name} />
                    {event.isLive && (
                       <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-red-600/90 backdrop-blur-md rounded-full shadow-lg shadow-red-500/20">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span className="text-white text-[9px] font-black uppercase tracking-widest">CANLI YAYINDA</span>
                       </div>
                    )}
                 </div>
                 
                 <div className="flex-1 p-10 md:p-12 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-80">{event.game}</span>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${event.status === 'BİTTİ' ? 'text-gray-500' : 'text-emerald-500'}`}>
                          {event.status}
                       </span>
                    </div>

                    <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight mb-4 group-hover:text-blue-500 transition-colors leading-tight">
                       {event.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-6 mb-8 mt-4 pt-6 border-t border-armoyu-card-border">
                       <div>
                          <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">TARİH</p>
                          <p className="text-sm font-black text-armoyu-text uppercase">{event.date}</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">KATILIMCI</p>
                          <p className="text-sm font-black text-armoyu-text uppercase">{event.participants}</p>
                       </div>
                       <div className="col-span-2">
                          <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">ÖDÜL HAVUZU</p>
                          <p className="text-sm font-black text-blue-500 uppercase">{event.rewards}</p>
                       </div>
                    </div>

                    <div className="mt-auto flex gap-4">
                       <button className={`flex-1 py-4 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl active:scale-95 ${event.status === 'BİTTİ' ? 'bg-gray-200 dark:bg-white/5 text-gray-500 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'}`}>
                          {event.status === 'BİTTİ' ? 'ETKİNLİK TAMAMLANDI' : 'HEMEN KAYIT OL / KATIL'}
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>

      </div>
      
      {/* Community Hosting Section */}
      <div className="mt-32 p-16 md:p-24 rounded-[70px] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 text-center">
         <h2 className="text-3xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic">KENDİ TURNUVANI DÜZENLE!</h2>
         <p className="text-armoyu-text-muted text-lg mb-10 max-w-2xl mx-auto">Sende topluluk içinde kendi turnuvanı veya etkinliğini düzenlemek istiyorsan bizimle iletişime geç, tüm altyapıyı sağlayalım.</p>
         <button className="px-12 py-5 bg-armoyu-text dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl active:scale-95 transition-all">
            ORGANİZASYON İÇİN BAŞVUR
         </button>
      </div>
    </div>
  );
}
