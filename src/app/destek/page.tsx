'use client';

import React, { useState } from 'react';
import { PageWidth } from '@armoyu/ui';
import Link from 'next/link';
import { SupportTicket } from '@armoyu/core';


// Mock support tickets data using the Model class
const MOCK_TICKETS = [
  {
    id: 'T-1024',
    subject: 'Küfürlü Oyuncu Şikayeti',
    category: 'Şikayet',
    status: 'Cevaplandı', 
    priority: 'Yüksek',
    createdAt: '22.03.2024 14:20',
    updatedAt: '2 saat önce',
    lastMessage: 'Gerekli yaptırım uygulandı.'
  },
  {
    id: 'T-1023',
    subject: 'Yeni Oyun Talebi: Valorant Sunucusu',
    category: 'Öneri',
    status: 'Açık',
    priority: 'Normal',
    createdAt: '21.03.2024 09:15',
    updatedAt: '1 gün önce',
    lastMessage: 'Yönetimle değerlendiriyoruz.'
  },
  {
    id: 'T-1019',
    subject: 'Hatalı Satın Alım Bildirimi',
    category: 'Bildiri',
    status: 'Kapandı',
    priority: 'Normal',
    createdAt: '15.03.2024 18:40',
    updatedAt: '5 gün önce',
    lastMessage: 'İadeniz tamamlandı.'
  }
].map(t => SupportTicket.fromJSON(t));

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
          <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter uppercase italic">DESTEK MERKEZİ</h1>
          <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
            Sorunlarını, önerilerini ve bildirimlerini profesyonel bir ortamda takip et.
          </p>
        </div>
        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           YENİ TALEB OLUŞTUR
        </button>
      </div>

      {/* Modern Table Layout */}
      <div className="glass-panel overflow-hidden rounded-[40px] border border-armoyu-card-border shadow-2xl">
        {/* Table Header - Desktop Only */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-6 bg-black/5 dark:bg-white/5 border-b border-armoyu-card-border">
          <div className="col-span-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">ID</div>
          <div className="col-span-4 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">KONU</div>
          <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">KATEGORİ</div>
          <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">DURUM</div>
          <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">SON AKTİVİTE</div>
          <div className="col-span-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">#</div>
        </div>

        {/* Filters Wrapper inside Table if needed, or keeping it separate. 
            Let's keep the filters outside for better hierarchy or just inside the table top. */}
        <div className="p-4 border-b border-armoyu-card-border bg-black/5 dark:bg-white/2">
           <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['Hepsi', 'Açık', 'Cevaplandı', 'Kapandı'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${filter === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Body */}
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Link 
                key={ticket.id} 
                href={`/destek/${ticket.id}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-5 md:py-6 hover:bg-blue-600/5 transition-all group items-center"
              >
                {/* ID - Mobile Label Added */}
                <div className="col-span-1 flex items-center md:block">
                  <span className="md:hidden text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mr-2">ID:</span>
                  <span className="text-xs font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">{ticket.id}</span>
                </div>

                {/* Konu & Son Mesaj */}
                <div className="col-span-4 min-w-0">
                  <h3 className="text-base font-black text-armoyu-text group-hover:text-blue-500 transition-colors uppercase italic truncate">{ticket.subject}</h3>
                  <p className="text-[11px] text-armoyu-text-muted font-medium mt-1 truncate opacity-70">Son: {ticket.lastMessage}</p>
                </div>

                {/* Kategori - Badge Styled */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    ticket.category === 'Şikayet' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' :
                    ticket.category === 'Öneri' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' :
                    'text-sky-500 border-sky-500/20 bg-sky-500/5'
                  }`}>
                    {ticket.category}
                  </span>
                </div>

                {/* Durum - Badge Styled */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      ticket.status === 'Açık' ? 'bg-amber-500 animate-pulse' :
                      ticket.status === 'Cevaplandı' ? 'bg-emerald-500' :
                      'bg-zinc-500'
                    }`}></span>
                    <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">{ticket.status}</span>
                  </div>
                </div>

                {/* Son Aktivite */}
                <div className="col-span-2">
                  <p className="text-[11px] font-bold text-armoyu-text">{ticket.updatedAt}</p>
                  <p className="text-[9px] text-armoyu-text-muted font-medium">{ticket.createdAt}</p>
                </div>

                {/* İşlem Button */}
                <div className="col-span-1 text-right hidden md:block">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-armoyu-text-muted group-hover:text-white transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                </div>

                {/* Mobile Priority Badge (Floating side) */}
                <div className="md:hidden absolute top-4 right-8">
                   <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${ticket.priority === 'Yüksek' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 'text-blue-500 border-blue-500/20 bg-blue-500/5'}`}>{ticket.priority}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-24 space-y-6">
               <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto text-armoyu-text-muted opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
               </div>
               <div>
                  <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight">Kayıt Bulunamadı</h3>
                  <p className="text-armoyu-text-muted font-medium mt-2">Bu filtreye uygun aktif destek talebiniz bulunmuyor.</p>
               </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

