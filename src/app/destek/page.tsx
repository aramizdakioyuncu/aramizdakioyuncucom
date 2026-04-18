'use client';

import React, { useState, useMemo } from 'react';
import { PageWidth, FilterTabs } from '@armoyu/ui';
import Link from 'next/link';
import { MessageSquare, Plus, Clock, AlertCircle, ChevronRight, Search } from 'lucide-react';

// Mock support tickets data
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
];

export default function SupportTicketsPage() {
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Hepsi', 'Açık', 'Cevaplandı', 'Kapandı'];

  const filteredTickets = useMemo(() => {
    return MOCK_TICKETS.filter(ticket => {
      const matchesFilter = activeTab === 'Hepsi' || ticket.status === activeTab;
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-16 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
               <span className="w-12 h-[2px] bg-blue-600" />
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">CUSTOMER SUPPORT</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-6">
              DESTEK <br/> <span className="text-blue-600">MERKEZİ</span>
            </h1>
            <p className="text-armoyu-text-muted text-xl font-medium max-w-2xl opacity-70 leading-relaxed">
              Sorunlarını, önerilerini ve bildirimlerini profesyonel bir ortamda takip et. Ekibimiz en kısa sürede seninle iletişime geçecektir.
            </p>
          </div>
          
          <button className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-[24px] shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-3 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
             <Plus size={20} strokeWidth={3} />
             <span>YENİ TALEP OLUŞTUR</span>
          </button>
        </div>
      </div>

      {/* Toolbar - Standardized */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
        <FilterTabs 
          tabs={tabs}
          active={activeTab}
          onChange={setActiveTab}
          variant="pill"
        />
        
        <div className="relative w-full lg:w-96 group">
           <input 
             type="text" 
             placeholder="Talep no veya konu ara..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[24px] px-8 py-4 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:opacity-50" 
           />
           <div className="absolute right-6 top-4 text-blue-500 group-focus-within:scale-110 transition-transform">
              <Search size={20} strokeWidth={2.5} />
           </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Link 
              key={ticket.id} 
              href={`/destek/${ticket.id}`}
              className="block group"
            >
              <div className="glass-panel p-8 rounded-[38px] border border-armoyu-card-border bg-armoyu-card-bg hover:bg-blue-600/[0.02] hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-2 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* ID & Category */}
                  <div className="flex flex-col items-center md:items-start shrink-0 min-w-[120px]">
                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 mb-3">{ticket.id}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      ticket.category === 'Şikayet' ? 'text-rose-500' :
                      ticket.category === 'Öneri' ? 'text-amber-500' :
                      'text-sky-500'
                    }`}>{ticket.category}</span>
                  </div>

                  {/* Subject & Status */}
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tight group-hover:text-blue-500 transition-colors mb-2 truncate">
                      {ticket.subject}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          ticket.status === 'Açık' ? 'bg-amber-500 animate-pulse' :
                          ticket.status === 'Cevaplandı' ? 'bg-emerald-500' :
                          'bg-zinc-500'
                        }`} />
                        <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">{ticket.status}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-armoyu-card-border" />
                      <div className="flex items-center gap-2">
                         <MessageSquare size={12} className="text-armoyu-text-muted" />
                         <span className="text-[11px] font-medium text-armoyu-text-muted truncate max-w-[200px]">{ticket.lastMessage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time & Action */}
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-center md:text-right hidden sm:block">
                       <div className="flex items-center gap-1.5 justify-center md:justify-end text-armoyu-text-muted mb-1">
                          <Clock size={12} />
                          <span className="text-[11px] font-bold uppercase">{ticket.updatedAt}</span>
                       </div>
                       <p className="text-[9px] font-medium opacity-50">{ticket.createdAt}</p>
                    </div>
                    
                    <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                       <ChevronRight size={20} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-40 text-center glass-panel rounded-[60px] border border-dashed border-armoyu-card-border">
             <div className="w-24 h-24 bg-blue-500/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/10">
                <AlertCircle size={48} className="text-blue-500 opacity-20" />
             </div>
             <h3 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-3">TALEBİNİZ BULUNMUYOR</h3>
             <p className="text-armoyu-text-muted font-bold text-sm tracking-widest uppercase opacity-60 mb-10">BU KRİTERLERE UYGUN BİR DESTEK KAYDI BULAMADIK.</p>
             <button 
               onClick={() => { setActiveTab('Hepsi'); setSearchQuery(''); }}
               className="px-12 py-4 bg-armoyu-text dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-[20px] shadow-xl hover:scale-105 active:scale-95 transition-all"
             >
                TÜM TALEPLERİ GÖSTER
             </button>
          </div>
        )}
      </div>
    </div>
  );
}


