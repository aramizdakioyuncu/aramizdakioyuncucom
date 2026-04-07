'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_GIVEAWAYS } from '@armoyu/ui';
import { notFound } from 'next/navigation';
import { Gift, Clock, Users, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export default function GiveawayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const giveaway = MOCK_GIVEAWAYS.find(g => g.id === resolvedParams.id);

  if (!giveaway) {
    notFound();
  }

  const handleJoin = () => {
    // Statik başarı efekti
    alert('Çekilişe başarıyla katıldın! Sonuçlar açıklandığında bildirim alacaksın.');
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Banner with Blur */}
      <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] mb-16 overflow-hidden">
        <div className="absolute inset-0">
           <img src={giveaway.image} alt={giveaway.title} className="w-full h-full object-cover blur-md scale-105 opacity-60" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
        </div>

        <div className="max-w-[1000px] mx-auto w-full px-4 relative h-full flex flex-col justify-end pb-16 z-10 text-center">
           <div className="flex justify-center mb-6">
              <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl flex items-center gap-2 ${giveaway.status === 'active' ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-red-500 text-white shadow-red-500/20'}`}>
                 {giveaway.status === 'active' ? 'DEVAM EDİYOR' : 'SONA ERDİ'}
              </span>
           </div>
           
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-4 uppercase drop-shadow-2xl">
              {giveaway.title}
           </h1>
           <p className="text-xl md:text-2xl font-bold text-armoyu-text-muted mt-2">Ödül: <span className="text-orange-400">{giveaway.prize}</span></p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
           <Link href="/cekilisler" className="hover:text-blue-500 flex items-center gap-1.5"><Gift size={12} /> ÇEKİLİŞLER</Link>
           <span>/</span>
           <span className="text-blue-500">{giveaway.id}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            <div className="glass-panel p-8 rounded-[40px] border border-orange-500/20 bg-orange-500/5 flex flex-col items-center justify-center text-center">
               <Clock className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
               <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-2">KALAN SÜRE</p>
               <h3 className="text-3xl font-black text-white">{giveaway.timeLeft}</h3>
            </div>

            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg flex flex-col items-center justify-center text-center relative overflow-hidden">
               <Sparkles className="absolute top-4 right-4 text-yellow-500/20" size={120} />
               <Users className="text-blue-500 mb-4 relative z-10" size={48} strokeWidth={1.5} />
               <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-2 relative z-10">KATILIMCI SAYISI</p>
               <h3 className="text-3xl font-black text-white relative z-10">{giveaway.participants} <span className="text-lg text-armoyu-text-muted">Kişi</span></h3>
            </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-16 relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
            {giveaway.status === 'active' ? (
              <button 
                onClick={handleJoin}
                className="group relative px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-[30px] shadow-2xl shadow-blue-600/30 active:scale-95 transition-all overflow-hidden"
              >
                 <span className="relative z-10 flex items-center gap-3">
                   <Trophy size={20} /> ÇEKİLİŞE KATIL
                 </span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            ) : (
              <button disabled className="px-12 py-6 bg-red-500/50 text-white/50 cursor-not-allowed font-black text-sm uppercase tracking-widest rounded-[30px] shadow-none flex items-center gap-3">
                 <ShieldCheck size={20} /> ÇEKİLİŞ SONA ERDİ
              </button>
            )}
        </div>

        {/* Details & Rules */}
        <div className="space-y-8">
           <div className="glass-panel p-8 md:p-12 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
              <h3 className="text-lg font-black text-armoyu-text mb-6 uppercase tracking-widest border-b border-white/5 pb-4">Çekiliş Şartları ve Kurallar</h3>
              <ul className="space-y-4 text-armoyu-text-muted">
                 <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mt-0.5">1</span>
                    <span className="leading-relaxed font-medium">Sadece kayıtlı ve hesabını doğrulamış üyeler katılabilir.</span>
                 </li>
                 <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mt-0.5">2</span>
                    <span className="leading-relaxed font-medium">Mükerrer hesaplarla katılım tespit edilirse, kişi platformdan tamamen süresiz yasaklanacaktır.</span>
                 </li>
                 <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mt-0.5">3</span>
                    <span className="leading-relaxed font-medium">Kazananlar açıklama tarihinde sistem üzerinden direkt bildirim ve mail alacaklardır.</span>
                 </li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
