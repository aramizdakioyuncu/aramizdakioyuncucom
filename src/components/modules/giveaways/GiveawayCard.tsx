'use client';

import React from 'react';

export interface GiveawayCardProps {
  title: string;
  prize: string;
  status: 'active' | 'ended';
  participants: number;
  timeLeft: string;
  image: string;
}

export function GiveawayCard({ title, prize, status, participants, timeLeft, image }: GiveawayCardProps) {
  const isActive = status === 'active';

  return (
    <div className={`group glass-panel rounded-[40px] overflow-hidden border transition-all duration-500 flex flex-col h-full bg-armoyu-card-bg ${isActive ? 'border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10' : 'border-armoyu-card-border opacity-70 grayscale'}`}>
      
      {/* Resim & Durum */}
      <div className="aspect-square p-8 relative flex items-center justify-center">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5" />
         <img 
           src={image} 
           alt={prize} 
           className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
         />
         
         {/* Status Badge */}
         <div className="absolute top-6 left-6">
            <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg ${isActive ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-gray-500 text-white'}`}>
               {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
               {isActive ? 'Aktif' : 'Sona Erdi'}
            </span>
         </div>
      </div>

      {/* İçerik */}
      <div className="px-8 pb-8 flex-1 flex flex-col text-center mt-[-30px]">
         <div className="relative z-10 p-6 rounded-[32px] bg-white dark:bg-zinc-900 border border-armoyu-card-border shadow-xl">
            <h3 className="text-xl font-black text-armoyu-text mb-2 line-clamp-1">{prize}</h3>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">
               {title}
            </p>

            {/* Bilgi Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <span className="block text-[8px] font-black text-armoyu-text-muted uppercase mb-1">Kalan Süre</span>
                  <span className="block text-xs font-black text-armoyu-text">{isActive ? timeLeft : 'Bitti'}</span>
               </div>
               <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <span className="block text-[8px] font-black text-armoyu-text-muted uppercase mb-1">Katılımcı</span>
                  <span className="block text-xs font-black text-armoyu-text">{participants} Kişi</span>
               </div>
            </div>

            <button 
              disabled={!isActive}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${isActive ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 active:scale-95' : 'bg-armoyu-card-border text-armoyu-text-muted cursor-not-allowed'}`}
            >
               {isActive ? 'Çekilişe Katıl' : 'Sonuçları Gör'}
            </button>
         </div>
         
         <div className="mt-8 flex justify-center -space-x-3">
             {[1,2,3,4].map(i => (
               <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+12}`} className="w-8 h-8 rounded-full border-2 border-armoyu-card-bg bg-white/10" alt="part" />
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-armoyu-card-bg bg-armoyu-card-border flex items-center justify-center text-[10px] font-black text-armoyu-text">+{participants - 4}</div>
         </div>
      </div>
    </div>
  );
}
