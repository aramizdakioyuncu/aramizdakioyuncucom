'use client';

import React, { useState } from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';

// Mock support tickets data
const MOCK_TICKETS = [
  {
    id: 'T-1024',
    subject: 'Minecraft Sunucu Bağlantı Hatası',
    category: 'Teknik Destek',
    status: 'Cevaplandı', // Açık, Cevaplandı, Kapandı
    priority: 'Yüksek', // Düşük, Normal, Yüksek
    createdAt: '22.03.2024 14:20',
    updatedAt: '2 saat önce',
    lastMessage: 'Gerekli kontroller sağlandı, tekrar deneyebilir misiniz?'
  },
  {
    id: 'T-1023',
    subject: 'Mağaza Alışverişinde WP Hatası',
    category: 'Ödeme İşlemleri',
    status: 'Açık',
    priority: 'Normal',
    createdAt: '21.03.2024 09:15',
    updatedAt: '1 gün önce',
    lastMessage: 'Ödeme dekontunuzu ekleyebilir misiniz?'
  },
  {
    id: 'T-1019',
    subject: 'Forum Yetki Başvurusu',
    category: 'Başvuru',
    status: 'Kapandı',
    priority: 'Düşük',
    createdAt: '15.03.2024 18:40',
    updatedAt: '5 gün önce',
    lastMessage: 'Başvurunuz olumlu sonuçlanmıştır.'
  }
];

export default function SupportTicketsPage() {
  const [filter, setFilter] = useState('Hepsi');

  const filteredTickets = filter === 'Hepsi' 
    ? MOCK_TICKETS 
    : MOCK_TICKETS.filter(t => t.status === filter);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1200px]" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-center md:text-left">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter uppercase italic">DESTEK BİLDİRİMLERİ</h1>
          <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
            Taleplerini buradan takip edebilir, yeni teknik destek veya genel bilgi taleplerini oluşturabilirsin.
          </p>
        </div>
        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           YENİ TALEB OLUŞTUR
        </button>
      </div>

      {/* Filters */}
      <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar mb-10">
        {['Hepsi', 'Açık', 'Cevaplandı', 'Kapandı'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${filter === tab ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-lg' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Link 
              key={ticket.id} 
              href={`/destek/${ticket.id}`}
              className="block group glass-panel p-6 md:p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:border-blue-500/30 transition-all cursor-pointer shadow-sm hover:shadow-xl"
            >
               <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 flex gap-6">
                     <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border-2 ${ticket.status === 'Açık' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : ticket.status === 'Cevaplandı' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-zinc-500/10 border-zinc-500/20 text-zinc-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                     </div>
                     <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                           <span className="text-xs font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">{ticket.id}</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${ticket.priority === 'Yüksek' ? 'text-red-500 border-red-500/20 bg-red-500/5' : ticket.priority === 'Düşük' ? 'text-zinc-500 border-zinc-500/20 bg-zinc-500/5' : 'text-blue-500 border-blue-500/20 bg-blue-500/5'}`}>{ticket.priority} ÖNCELİK</span>
                           <span className="text-[11px] font-bold text-armoyu-text-muted opacity-60">• {ticket.category}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-armoyu-text group-hover:text-blue-500 transition-colors uppercase italic truncate">{ticket.subject}</h3>
                        <p className="text-sm text-armoyu-text-muted mt-2 font-medium line-clamp-1 italic opacity-80">Son mesaj: {ticket.lastMessage}</p>
                     </div>
                  </div>
                  
                  <div className="flex md:flex-col items-end justify-between md:justify-center gap-4 text-right border-t md:border-t-0 md:border-l border-armoyu-card-border pt-4 md:pt-0 md:pl-8">
                     <div>
                        <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">SON GÜNCELLEME</p>
                        <p className="text-sm font-bold text-armoyu-text whitespace-nowrap">{ticket.updatedAt}</p>
                     </div>
                     <div className="hidden md:block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-armoyu-text-muted group-hover:text-blue-500 group-hover:translate-x-1 transition-all"><polyline points="9 18 15 12 9 6"></polyline></svg>
                     </div>
                     <div className="md:hidden">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Açık' ? 'bg-amber-500 text-white' : ticket.status === 'Cevaplandı' ? 'bg-emerald-500 text-white' : 'bg-zinc-500 text-white'}`}>
                           {ticket.status}
                        </span>
                     </div>
                  </div>
               </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-32 glass-panel rounded-[50px] border-2 border-dashed border-armoyu-card-border space-y-6">
             <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto text-armoyu-text-muted opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
             </div>
             <div>
                <h3 className="text-2xl font-black text-armoyu-text uppercase underline decoration-blue-500 underline-offset-8">Burası Çok Sessiz...</h3>
                <p className="text-armoyu-text-muted font-medium mt-4">Şu an filtrenize uygun bir destek talebi bulunamadı.</p>
             </div>
             <button onClick={() => setFilter('Hepsi')} className="text-blue-500 font-black text-xs uppercase tracking-widest hover:underline">Tüm Kayıtları Göster</button>
          </div>
        )}
      </div>

      {/* Help Banner */}
      <div className="mt-20 p-8 md:p-12 rounded-[60px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-blue-500/20 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>
         <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight uppercase italic">Hala Yardıma mı İhtiyacın Var?</h2>
            <p className="text-white/80 font-medium text-lg max-w-xl italic">
               Destek ekibimiz 7/24 hizmetinizde. Discord sunucumuza katılarak da hızlı destek alabilirsiniz.
            </p>
         </div>
         <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-10 py-5 bg-white text-blue-600 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">S.S.S. GÖRÜNTÜLE</button>
            <button className="px-10 py-5 bg-indigo-900/40 backdrop-blur-md border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-900/60 transition-all">DİSCORD SUNUCUSU</button>
         </div>
      </div>
    </div>
  );
}
