'use client';

import React, { useState, useMemo } from 'react';
import { PageWidth } from '@armoyu/ui';
import { ViewModeToggle, ViewMode } from '@armoyu/ui';
import Link from 'next/link';
import { eventList, gameList } from '@armoyu/ui';
import { Gamepad2, Users, Trophy, Radio, Target, Sparkles, ChevronRight, Layers } from 'lucide-react';

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Calculate Game Stats
  const gameStatsData = useMemo(() => {
    const games = Array.from(new Set(eventList.map(e => e.game)));
    return games.map(gameName => {
      const gEvents = eventList.filter(e => e.game === gameName);
      const activeCount = gEvents.filter(e => e.status.toUpperCase() !== 'BİTTİ').length;
      
      // Find game poster from centralized gameList
      const gameData = gameList.find(g => g.name === gameName);
      
      return {
        name: gameName,
        total: gEvents.length,
        active: activeCount,
        poster: gameData?.poster || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80&ar=3:4'
      };
    }).sort((a, b) => b.active - a.active); // Active events first
  }, []);

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    let result = eventList;
    if (selectedGame) {
      result = result.filter(e => e.game === selectedGame);
    }
    return result.sort((a, b) => {
        if (a.status.toUpperCase() === 'BİTTİ' && b.status.toUpperCase() !== 'BİTTİ') return 1;
        if (a.status.toUpperCase() !== 'BİTTİ' && b.status.toUpperCase() === 'BİTTİ') return -1;
        return 0;
    });
  }, [selectedGame]);

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-12 pt-8 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
           <span className="w-12 h-[2px] bg-blue-600" />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">ARMOYU ARENA</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-4">
           ETKİNLİKLER
        </h1>
        <p className="text-armoyu-text-muted text-lg font-medium max-w-xl opacity-70">
           Topluluğun kalbinin attığı yer burası. Oyununu seç, turnuvaya katıl ve ödülleri topla.
        </p>
      </div>

      {/* Vertical Game Poster Grid */}
      <div className="mb-20">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic flex items-center gap-3">
               <Layers className="text-blue-500" size={24} /> OYUNUNU SEÇ
            </h2>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {/* All Events Card - Special Vertical */}
            <button 
               onClick={() => setSelectedGame(null)}
               className={`group relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500 border-2 active:scale-95 ${!selectedGame ? 'border-blue-500 shadow-2xl shadow-blue-500/20' : 'border-transparent hover:border-white/20'}`}
            >
               <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black z-0" />
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&auto=format&fit=crop&q=80&ar=3:4')] opacity-50 group-hover:scale-110 transition-transform duration-700 object-cover mix-blend-overlay" />
               <div className="relative z-10 h-full p-4 flex flex-col justify-between text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-white uppercase leading-tight mb-1">TÜM<br/>OYUNLAR</h3>
                     <div className="h-1 w-8 bg-blue-500 rounded-full mb-2" />
                     <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{eventList.length} Etkinlik</p>
                  </div>
               </div>
            </button>

            {/* Individual Game Posters */}
            {gameStatsData.map((game) => (
               <button 
                 key={game.name}
                 onClick={() => setSelectedGame(game.name)}
                 className={`group relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500 border-2 active:scale-95 ${selectedGame === game.name ? 'border-blue-500 shadow-2xl shadow-blue-500/20' : 'border-transparent hover:border-white/20'}`}
               >
                 <img src={game.poster} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={game.name} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent z-0" />
                 
                 <div className="relative z-10 h-full p-4 flex flex-col justify-between text-left">
                    <div className="flex justify-end">
                       {game.active > 0 && (
                          <div className="px-2 py-1 bg-emerald-500/90 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-widest animate-pulse">
                             {game.active} AKTİF
                          </div>
                       )}
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-white uppercase leading-tight mb-1 truncate drop-shadow-lg">{game.name}</h3>
                       <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{game.total} Etkinlik</p>
                    </div>
                 </div>
               </button>
            ))}
         </div>
      </div>

      <div className="space-y-12">
         
         {/* Filter Header */}
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-armoyu-card-border">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Gamepad2 className="text-blue-500" size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic leading-none">
                     {selectedGame ? selectedGame : 'TÜM ETKİNLİKLER'}
                  </h3>
                  <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mt-1">{filteredEvents.length} SONUÇ LİSTELENDİ</p>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <ViewModeToggle mode={viewMode} onChange={setViewMode} />
            </div>
         </div>

         {/* Events Listing */}
         {filteredEvents.length === 0 ? (
            <div className="py-32 text-center glass-panel rounded-[40px] border border-dashed border-armoyu-card-border">
               <Target size={48} className="mx-auto text-armoyu-text-muted/20 mb-6" />
               <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">BU OYUNDA HENÜZ ETKİNLİK BULUNMUYOR</h3>
               <p className="text-armoyu-text-muted font-bold text-xs tracking-widest uppercase opacity-60">YAKINDA YENİ TURNUVALAR EKLENECEKTİR.</p>
            </div>
         ) : (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredEvents.map((event) => (
                   <div key={event.id} className="group glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden hover:shadow-2xl transition-all duration-500 bg-armoyu-card-bg flex flex-col">
                      <Link href={`/etkinlikler/${event.id}`} className="aspect-video overflow-hidden relative block group-hover:scale-105 transition-transform duration-700">
                         <img src={event.banner} className="w-full h-full object-cover" alt={event.title} />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                         
                         {/* Badges */}
                         <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {event.isLive && (
                               <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-md rounded-xl text-[8px] font-black text-white uppercase tracking-widest">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                               </div>
                            )}
                            <div className={`px-3 py-1.5 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest ${event.status.toUpperCase() === 'BİTTİ' ? 'bg-gray-900/80 text-gray-400' : 'bg-emerald-600/90 text-white'}`}>
                               {event.status}
                            </div>
                         </div>
                      </Link>
                      
                      <div className="p-8 flex flex-col flex-1">
                         <div className="flex items-center gap-2 mb-4">
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">{event.game}</span>
                         </div>
   
                         <Link href={`/etkinlikler/${event.id}`}>
                            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight mb-6 group-hover:text-blue-500 transition-colors leading-tight italic truncate">
                               {event.title}
                            </h3>
                         </Link>
   
                         <div className="grid grid-cols-2 gap-4 pt-6 border-t border-armoyu-card-border mt-auto">
                            <div className="flex items-center gap-2">
                               <Radio size={14} className="text-armoyu-text-muted" />
                               <span className="text-[10px] font-bold text-armoyu-text uppercase">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                               <Users size={14} className="text-armoyu-text-muted" />
                               <span className="text-[10px] font-bold text-armoyu-text uppercase">{event.currentParticipants}/{event.participantLimit}</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 pt-2">
                               <Trophy size={14} className="text-amber-500" />
                               <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter truncate">{event.rewards}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            ) : (
              /* Table View - Compact */
              <div className="glass-panel rounded-[32px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg shadow-xl">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-black/5 dark:bg-white/5 border-b border-armoyu-card-border">
                             <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted leading-none">ETKİNLİK</th>
                             <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted leading-none">TARİH</th>
                             <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted leading-none">ÖDÜL</th>
                             <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted leading-none">DURUM</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-armoyu-card-border">
                          {filteredEvents.map((event) => (
                             <tr key={event.id} className="group hover:bg-blue-500/5 transition-colors">
                                <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                      <img src={event.banner} className="w-10 h-10 rounded-lg object-cover" alt={event.title} />
                                      <Link href={`/etkinlikler/${event.id}`} className="text-xs font-black text-armoyu-text group-hover:text-blue-500 transition-colors uppercase tracking-tight italic">{event.title}</Link>
                                   </div>
                                </td>
                                <td className="px-6 py-4 text-[11px] font-bold text-armoyu-text uppercase">{event.date}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-blue-500 uppercase tracking-tighter italic">{event.rewards}</td>
                                <td className="px-6 py-4">
                                   <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${event.status.toUpperCase() === 'BİTTİ' ? 'text-gray-500 border-gray-500/20' : 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'}`}>
                                      {event.status}
                                   </span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )
         )}

      </div>
      
      {/* Community Hosting Section - Compact */}
      <div className="mt-24 p-12 rounded-[50px] bg-gradient-to-br from-blue-600/10 to-emerald-500/5 border border-blue-500/10 relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
               <h2 className="text-2xl font-black text-armoyu-text mb-2 uppercase tracking-tighter italic">KENDI TURNUVANI DÜZENLE</h2>
               <p className="text-armoyu-text-muted text-sm max-w-md font-medium">Topluluk içindeki turnuvalar için tüm altyapıyı sağlıyoruz.</p>
            </div>
            <button className="px-10 py-4 bg-armoyu-text dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95">
               ORGANIZASYON BAŞVURUSU
            </button>
         </div>
      </div>
    </div>
  );
}
